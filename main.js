document.addEventListener('DOMContentLoaded',function(){
    
    var Placeholder = new PlaceholderFaker();

    Placeholder.getInputsPlaceholder();
    Placeholder.initalEvents();

})

var PlaceholderFaker = function(){

    this.checkInternetExplorer = function(){
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf("MSIE ");
        if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))
        {
           return true;
        }
    }

    this.getInputsPlaceholder = function(){
        var inputs = document.querySelectorAll('input[placeholder]');

        for (let index = 0; index < inputs.length; index++) {
            const field = inputs[index];
            
            if(field.placeholder !== undefined && field.placeholder.length > 0){
                var placeholderTemplate = document.getElementsByTagName('placeholder-data-container')[0].querySelector('placeholder-data[field="'+ field.placeholder +'"]')
                if(placeholderTemplate != undefined){
                    var template = "<placeholder-fake>" + placeholderTemplate.innerHTML + "</placeholder-fake>";
                    field.removeAttribute('placeholder');
                    var htmlInput = field.outerHTML;
                    if(this.checkInternetExplorer()){
                        var fakeField = "<outer-input class='" + field.getAttribute('name') + " placeholder-fake internetExplorer'>" + htmlInput + template + "</outer-input>";  
                    }else{
                        var fakeField = "<outer-input class='" + field.getAttribute('name') + " placeholder-fake'>" + htmlInput + template + "</outer-input>";  
                    }
              
                    field.outerHTML = fakeField;
                }else{
                    var template = "<placeholder-fake>" + field.getAttribute('placeholder') + "</placeholder-fake>";
                    field.removeAttribute('placeholder');

                    if(this.checkInternetExplorer()){
                        field.outerHTML = "<outer-input class='" + field.getAttribute('name') + " placeholder-fake internetExplorer'>" + field.outerHTML + template + "</outer-input>"; 
                    }else{
                        field.outerHTML = "<outer-input class='" + field.getAttribute('name') + " placeholder-fake'>" + field.outerHTML + template + "</outer-input>";
                    }
                }                
            }else{
                if(this.checkInternetExplorer()){
                    field.outerHTML = "<outer-input class='" + field.getAttribute('name') + " placeholder-fake noPlaceholder internetExplorer'>" + field.outerHTML + "</outer-input>";
                }else{
                    field.outerHTML = "<outer-input class='" + field.getAttribute('name') + " placeholder-fake noPlaceholder'>" + field.outerHTML + "</outer-input>";
                }
            }
            

        }

    }

    this.initalEvents = function(){

        var inputs = document.querySelectorAll('outer-input');

        for (let index = 0; index < inputs.length; index++) {
            const input = inputs[index];

            input.getElementsByTagName('input')[0].addEventListener('input',function(e){
               if(this.value.trim().length > 0){
                    this.parentElement.getElementsByTagName('placeholder-fake')[0].style.display = "none";
               }else{
                    this.parentElement.getElementsByTagName('placeholder-fake')[0].style.display = "block";
               }
            })
        }

    }

}