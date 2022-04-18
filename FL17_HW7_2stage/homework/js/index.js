// Write your code here

$(document).ready(function () {

    $('#one').click(function () {
        document.form.output.value += 1;
    });

    $('#two').click(function () {
        document.form.output.value += 2;
    });

    $('#three').click(function () {
        document.form.output.value += 3;
    });

    $('#four').click(function () {
        document.form.output.value += 4;
    });

    $('#five').click(function () {
        document.form.output.value += 5;
    });

    $('#six').click(function () {
        document.form.output.value += 6;
    });

    $('#seven').click(function () {
        document.form.output.value += 7;
    });

    $('#eight').click(function () {
        document.form.output.value += 8;
    });

    $('#nine').click(function () {
        document.form.output.value += 9;
    });

    $('#zero').click(function () {
        document.form.output.value += 0;
    });

    $('#add').click( function () {
        if (Number.isInteger(+document.form.output.value.slice(-1))){
            console.log(Number.isInteger(document.form.output.value));
            document.form.output.value += '+';
        } else {
            document.form.output.value = document.form.output.value.slice(0, document.form.output.value.length-1)+'+';
        }
    });

    $('#subs').click( function () {
        if (Number.isInteger(+document.form.output.value.slice(-1))){
            console.log(Number.isInteger(document.form.output.value));
            document.form.output.value += '-';
        } else {
            document.form.output.value = document.form.output.value.slice(0, document.form.output.value.length-1)+'-';
        }
    });

    $('#multi').click( function () {
        if (Number.isInteger(+document.form.output.value.slice(-1))){
            console.log(Number.isInteger(document.form.output.value));
            document.form.output.value += '*';
        } else {
            document.form.output.value = document.form.output.value.slice(0, document.form.output.value.length-1)+'*';
        }
    });

    $('#divide').click( function () {
        if (Number.isInteger(+document.form.output.value.slice(-1))){
            console.log(Number.isInteger(document.form.output.value));
            document.form.output.value += '/';
        } else {
            document.form.output.value = document.form.output.value.slice(0, document.form.output.value.length-1)+'/';
        }
    });

    $('#equal').click(function (){
        let log = document.createElement('div');

        let result = `${document.form.output.value} =${new Function("return " + document.form.output.value)()}`;
        log.innerHTML = `<div class="logs">
                        <span class="circle"></span>
                        <div class="calculator_log">${result}</div>
                        <span class="close-symbol" onсlick="deleteLog()"><strong>✕</strong></span>
                     </div>`;
        $('.main_logs_container').append(log);

        if (result.includes('48')){
            $('.calculator_log').css('text-decoration', 'underline');
        }

        $('.circle').click(function () {
            $(this).toggleClass('clicked_red');
        });

        $('.close-symbol').click(function () {
            $(this).parent().remove();
        });
    }).click(function () {
        if (document.form.output.value === "") {
            console.log(document.form.output.value+'pls input');
        } else {
            try {
                let result = new Function("return " + document.form.output.value)();
                document.form.output.value = result;
                if(result === Infinity){
                    document.form.output.value = '';
                    //$('#output').attr('placeholder','ERROR');
                    $('input:text').attr('placeholder','ERROR');
                    $('#output').addClass('red');
                } else {
                    $('input:text').attr('placeholder','0');
                    $('#output').removeClass('red');
                }
            } catch (error){
                document.form.output.value = '';
                console.log(error)
            }


        }
    });

    $('#clear').click(function(){
        document.form.output.value = '';
        $('input:text').attr('placeholder','0');
        $('#output').removeClass('red');
    });
})