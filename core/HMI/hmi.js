/*
*@brief objeto de HMI
*@author Hector E. Socarras
*@date 11/01/2016
*/

import EM from '../../libs/es-event-emitter/src/event-emitter.js';
import Screen from './screen.js';
import {Controls} from './widgets/controls.js'


    //Singleton
export var HMI = function(){
        //singleton model
        //Class Definicion
        class HMI extends EM {

          constructor(){
              super();

              this.CONFIG;

              this.ScreenStack = new Map();


              //Class Library for controls
              //this.ControlsLibrary = OwnControls;

              //StartupScreen(Screen Name)
              //this.StartupScreen = '';

              this.activeScreen = '';

              //get Instance method in singleton design
              this.GetInstance = function(){
                  return this;
              }

          }

          Load(HCFG){
            var self = this;
            this.CONFIG = HCFG;

            this.CONFIG.ScreenList.forEach(function(screen){
              self.LoadScreen(screen, function(){
                if(self.ScreenStack.size == self.CONFIG.ScreenList.length){
                  self.emit('hmi-loaded');
                }
              })
            })



          }

          /**
          *funcion que crea el objeto screen a partir del json y lo guarda en el screen map.
          * @param {string} screenName
          */
          LoadScreen(screenName, callback){

            if (typeof screenName !== 'string') {
              throw new TypeError(`${screenName} is not a string`);
            }

            if(callback){
              if (typeof callback !== 'function') {
                throw new TypeError(`${callback} is not a function`);
              }
            }

              var self = this;
              var url = this.CONFIG.ScreensPath + '/' + screenName + '.psc';

              if(this.ScreenStack.has(screenName)){
                  return;
              }
              else{
                let ajax = $.getJSON(url, function( json ) {
                      json.name = screenName;
                      let newScreen =  new Screen(json);
                      self.ScreenStack.set(screenName, newScreen);
                      self.emit('screen-loaded', screenName);
                  });
                  if(callback){
                    ajax.done(callback)
                  }
              }


          }

          OpenScreen(screenName, mode = 'main'){

              var self = this;

              let screen;
              let container
              let view;

              if(self.ScreenStack.has(screenName)){

                  switch(mode){
                      case 'main':
                          this.activeScreen = screenName;

                          //borro la screen anterior;
                          container = document.getElementById("ActiveScreen");
                          //container.removeChild();
                          //container.empty();

                          //creo la nueva screen
                          screen = this.ScreenStack.get(screenName);
                          screen._CreateView(container);
                          screen._Clock.Start();
                          
                          break;
                  }

              }
              else{
                  /*
                  this.LoadScreen(screenName);
                  this.once('screen-loaded', this.OpenScreen.bind(this));
                  */
              }


          }

          CloseScreen(screenName){}

          SetHTML(){
              //Debe crecer en funcionalidades a medida que se vayan agragando
              //Ejemplo banner, treeview, statusbar etc

              //Set the screen Area
              $("body").prepend("<div id=ActiveScreen></div>");
              //$("#ScreenArea").prepend("<div id=ActiveScreen></div>")

          }

          /**
          *funcion que inicia el HMI.
          * @param {objet} screenName
          */
          Start(screenName){
              var self = this;

              //Setting the body of index.html
              this.SetHTML();



              //loading startup screen

              this.once('hmi-loaded', this.OpenScreen.bind(this, screenName))


              //this.OpenScreen();

          }
        }

        return new HMI();

    }();
