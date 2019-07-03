let remainingChoices = parseInt($('#choicesLeft').text());

$('.unitCard').click(function(event){
    if($(this).attr('data-selected')==='true') {
        console.log('already selected');
        $(this).attr('data-selected',false);
        $(this).removeClass('selectedUnit');
        remainingChoices++;
    }
    else {
        console.log('not yet picked');
        if(remainingChoices>0) {
            $(this).addClass('selectedUnit');
            $(this).attr('data-selected',true);
            remainingChoices --
        }
    }
    $('#choicesLeft').text(remainingChoices);
    if($('.selectedUnit').length>0) {
        $('#formArmyButton').removeAttr('disabled');
    }
    else {
        $('#formArmyButton').attr('disabled','disabled');
    }
})

$('#formArmyButton').click(function(event){
    let chosenUnits = [];
    let selectedUnits = $('.selectedUnit');
    for (let i = 0; i < selectedUnits.length; i++) {
        let newUnit = {
            name:$(selectedUnits[i]).attr('data-name'),
            level:$(selectedUnits[i]).attr('data-level'),
            class:$(selectedUnits[i]).attr('data-class'),
        }
        console.log('this unit:', newUnit);
        chosenUnits.push(newUnit);
        
    }
    $.post('/signup/rufasa85',{units:chosenUnits}).then(data=>{
        console.log(data);
    })
    // console.log(chosenUnits)
})