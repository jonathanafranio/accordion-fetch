fetch('../jonathan/?page_id=28')
.then(res => res.json())
.then(response=> {
    for (var a = 0; a < response.length; a++) {
        title = document.createElement('a');
        title.classList.add('accordion__link');
        title.setAttribute('href', response[a].url);
        title.setAttribute('rel', 'nofollow');
        title.append(response[a].title);

        list = document.createElement('li');
        list.classList.add('accordion__list');
        list.append(title);

        bodyAccordion = document.createElement('div');
        bodyAccordion.classList.add('accordion__body');
        list.append(bodyAccordion)

        document.querySelector('.accordion').append(list);
    }

    accordionWithFetch();

});
function accordionWithFetch(){
    let accordion = document.querySelectorAll('.accordion__link');
    for (b of accordion) {
        b.addEventListener('click', function(event){
            event.preventDefault();
            let thisWrap = this.parentElement;

            if(thisWrap.classList.contains('-is-active')) {
                thisWrap.classList.remove('-is-active');
                thisWrap.querySelector('.accordion__body').removeAttribute('style');
                thisWrap.parentElement.querySelector('.accordion__body').innerHtml='';
            } else {
                for (var b = 0; b < accordion.length; b++) {
                    accordion[b].parentElement.classList.remove('-is-active');
                    accordion[b].parentElement.querySelector('.accordion__body').removeAttribute('style');
                    accordion[b].parentElement.querySelector('.accordion__body').innerHtml='';
                }
                thisWrap.classList.add('-is-loading');

                fetch(this.getAttribute('href'))
                .then(post => post.json())
                .then(response => {
                    //console.log(response.txt);
                    textDescription = document.createElement('div');
                    textDescription.classList.add('accordion__content');
                    textDescription.append(response.txt);

                    thisWrap.querySelector('.accordion__body').append(textDescription);

                    let childElementDiv = thisWrap.querySelector('.accordion__content').offsetHeight;

                    thisWrap.classList.remove('-is-loading');
                    thisWrap.classList.add('-is-active');

                    thisWrap.querySelector('.accordion__body').style.height=childElementDiv+'px';
                });

            }
        });
    }
}



let accordionStatic = document.querySelectorAll('.simple-accordion__link');
for (c of accordionStatic) {
    c.addEventListener('click',function(event){
        event.preventDefault();
        var thisWrap = this.parentElement;
        if(thisWrap.classList.contains('-is-active')) {
            thisWrap.classList.remove('-is-active');
            thisWrap.querySelector('.simple-accordion__body').removeAttribute('style');
        } else {
            for (var d = 0; d < accordionStatic.length; d++) {
                accordionStatic[d].parentElement.classList.remove('-is-active');
                accordionStatic[d].parentElement.querySelector('.simple-accordion__body').removeAttribute('style');
            }
            var childElementDiv = thisWrap.querySelector('.simple-accordion__content').offsetHeight;
            thisWrap.classList.add('-is-active');
            thisWrap.querySelector('.simple-accordion__body').style.height=childElementDiv+'px';
        }
    });
}
