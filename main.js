document.addEventListener('DOMContentLoaded',function(){
    
    var Placeholder = new PlaceholderFaker();

    Placeholder.getInputsPlaceholder();
    Placeholder.initalEvents();

})

var PlaceholderFaker = function(){

    this.getInputsPlaceholder = () => {
        var inputs = document.querySelectorAll('input[placeholder]');

        for (let index = 0; index < inputs.length; index++) {
            const field = inputs[index];
            
            if(field.placeholder !== undefined && field.placeholder.length > 0){
                var placeholderTemplate = document.getElementById('placeholderData').content.querySelector('placeholder-data[field="'+ field.placeholder +'"]')
                if(placeholderTemplate != undefined){
                    var template = "<placeholder-fake>" + placeholderTemplate.innerHTML + "</placeholder-fake>";
                    field.removeAttribute('placeholder');
                    var htmlInput = field.outerHTML;
                    var fakeField = "<outer-input class='" + field.getAttribute('name') + " placeholder-fake'>" + htmlInput + template + "</outer-input>";                
                    field.outerHTML = fakeField;
                }else{
                    var template = "<placeholder-fake>" + field.getAttribute('placeholder') + "</placeholder-fake>";
                    field.removeAttribute('placeholder');
                    field.outerHTML = "<outer-input class='" + field.getAttribute('name') + " placeholder-fake'>" + field.outerHTML + template + "</outer-input>";
                }                
            }else{
                field.outerHTML = "<outer-input class='" + field.getAttribute('name') + " placeholder-fake noPlaceholder'>" + field.outerHTML + "</outer-input>";
            }
            

        }

    }

    this.initalEvents = () => {

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