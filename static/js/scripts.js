let remainingChoices = 5;


$('.unitCard').click(function(event){
    if($(this).data('selected')) {
        console.log('already selected');
        $(this).data('selected',false);
        $(this).removeClass('selectedUnit');
        remainingChoices++;
    }
    else {
        console.log('not yet picked');
        if(remainingChoices>0) {
            $(this).addClass('selectedUnit');
            $(this).data('selected',true);
            remainingChoices --
        }
    }
    $('#choicesLeft').text(remainingChoices);
})