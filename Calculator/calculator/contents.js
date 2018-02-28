var a = 0, b = 0, is_a = true, is_b = false, o = 'nil', answer = 0, first_a = true, first_b = true, is_submission = false, soft_sub = false, display = $('.total');
function write(x) {
    console.log(x);
}
function changeDisplayVal(i) {
    display.text(display.text() + i);
}
function visOps(x) {
    if (x === '*') {
        return '\xD7';
    } else if (x === '/') {
        return '\xF7';
    } else {
        return x;
    }
}
function setDisplayVal(x) {
    display.text(visOps(x));
}
function animateButton(obj) {
    var button = obj.addClass('active');
    setTimeout(function () {
        button.removeClass('active');
    }, 100);
}
function set_a(i) {
    if (is_a) {
        if (i === '.' && a.toString().indexOf('.') !== -1) {
            write('Duplicate Decimal');
            i = '';
        } else if (i === '.' && first_a) {
            i = '0.';
        }
        if (first_a === true) {
            if (i === '0') {
                i = '';
            } else {
                setDisplayVal(i);
                first_a = false;
            }
        } else {
            changeDisplayVal(i);
        }
        a = display.text();
        write('Set "a" to ' + a);
    }
}
function set_b(i) {
    if (!is_a) {
        if (i === '.' && b.toString().indexOf('.') !== -1) {
            write('Duplicate Decimal!');
            i = '';
        } else if (i === '.' && first_b) {
            i = '0.';
        }
        if (first_b === true) {
            if (i === '0') {
                i = '';
            } else {
                setDisplayVal(i);
                first_b = false;
            }
        } else {
            changeDisplayVal(i);
        }
        b = display.text();
        write('Set "b" to ' + b);
    }
}
function loop_calc(answer) {
    write('Loop Calculator');
    a = answer;
    b = 0;
    answer = 0;
    setDisplayVal(a);
}
function set_o(op) {
    if (is_submission) {
        loop_calc(display.text());
        is_submission = false;
    }
    if (!first_b) {
        softsubmit_calc();
    }
    setDisplayVal(op);
    o = op;
    if (is_a) {
        is_a = false;
    }
    if (!is_b) {
        is_b = true;
    }
    write('Set "o" to ' + o);
}
function softsubmit_calc() {
    var preCalc = eval(a + '' + o + '' + b);
    answer = parseFloat(preCalc.toPrecision(12));
    display.text(answer);
    first_b = true;
    newResult(a, o, b, answer);
    write(a + ' ' + o + ' ' + b + ' = ' + answer);
    a = answer;
    b = 0;
    o = o;
    setDisplayVal(o);
    is_a = false;
    is_b = true;
    first_b = true;
    soft_sub = true;
    write('Soft Submission');
}
function submit_calc() {
    write('Submission');
    if (first_b === false) {
        var preCalc = 0;
        if (o === '^') {
            preCalc = Math.pow(a, b);
        } else {
            preCalc = eval(a + '' + o + '' + b);
        }
        answer = parseFloat(preCalc.toPrecision(12));
        display.text(answer);
        is_submission = true;
        first_b = true;
        newResult(a, o, b, answer);
        write(a + ' ' + o + ' ' + b + ' = ' + answer);
    } else {
        write('You can\'t do that yet');
    }
}
function neg() {
    display.text(display.text() * -1);
    if (is_submission) {
        a = a * -1;
    } else {
        if (is_a) {
            a = a * -1;
            setDisplayVal(a);
        } else {
            b = b * -1;
            setDisplayVal(b);
        }
    }
}
function reset_calc() {
    a = 0;
    b = 0;
    o = 'nil';
    answer = 0;
    is_a = true;
    is_b = false;
    first_a = true;
    first_b = true;
    is_submission = false;
    soft_sub = false;
    display.text(0);
    setDisplayVal(0);
	$('.last').html('');
    write('Calculator Reset');
}
function backspace() {
    if (display.text() !== '' && display.text() !== '0'){
        display.text(display.text().substring(0, display.text().length - 1));
        if (is_a === true) {
            a = parseFloat(a.toString().substring(0, a.toString().length - 1));
        } else {
            b = parseFloat(b.toString().substring(0, b.toString().length - 1));
        }
    } else {
        write('Nothing Left to Backspace');
    }
	if(display.text()==0){
		first_a = true;
		first_b = true;
		display.text(0);
		setDisplayVal(0);
	}
}
function newResult(a, o, b, answer){
    var results = $('.history-list');
    var result = '' + '<li class="result"><span class="equation"><span class="a">'+ a +'</span> <span class="o">'+ visOps(o) +'</span> <span class="b">'+ b +'</span></span> = <span class="answer">' + answer + '</span></li>';
    results.prepend(result).children('li').fadeIn(200);
	if($('.history-list')){
		var last = $('.history-list li:first-child').find('.equation').html();
		$('.last').html(last);
	}
}
function sqrt(i) {
    write('Square Root');
    var s = Math.sqrt(i);
    answer = s;
    write('u221A' + i + ' = ' + s);
    loop_calc(s);
    newResult('', '\u221A', i, s);
    display.text(answer);
    is_submission = true;
    first_b = true;
}
function square(i) {
    write('Square');
    var s = i * i;
    answer = s;
    write(i + ' u005E 2 = ' + s);
    loop_calc(s);
    newResult(i, ' &#94; 2', '', s);
    display.text(answer);
    is_submission = true;
    first_b = true;
}
function denom(i) {
    write('Denominator');
    var s = 1 / i;
    answer = s;
    write('1 / ' + i + ' = ' + s);
    loop_calc(s);
    newResult(1, ' / ', i, s);
    display.text(answer);
    is_submission = true;
    first_b = true;
}
$('.calc_int, .calc_dec').each(function () {
    $(this).click(function () {
        var value = $(this).val();
        if (is_submission === false) {
            if (is_a === true) {
                set_a(value);
            } else {
                set_b(value);
            }
        } else {
            reset_calc();
            set_a(value);
        }
    });
});
$('.calc_op').each(function () {
    $(this).click(function () {
        var value = $(this).val();
        set_o(value);
    });
});
$('.calc_eval').click(function () {
    submit_calc();
});
$('.calc_cls').click(function () {
    reset_calc();
});
$('.calc_neg').click(function () {
    neg();
});
$('.calc_bac').click(function () {
    backspace();
});
$('.calc_sqrt').click(function () {
    if (display.text() !== '0') {
        if (is_submission) {
            sqrt(answer);
        } else if (is_a) {
            sqrt(a);
        }
    }
    return false;
});
$('.calc_square').click(function () {
    if (display.text() !== '0') {
        if (is_submission) {
            square(answer);
        } else if (is_a) {
            square(a);
        }
    }
    return false;
});
$('.calc_denom').click(function () {
    if (display.text() !== '0') {
        if (is_submission) {
            denom(answer);
        } else if (is_a) {
            denom(a);
        }
    }
    return false;
});
$(document).on('keypress',function (e) {
    var charCode = e.which;
    var key = String.fromCharCode(charCode);
    if (charCode >= 46 && charCode <= 58 && charCode !== 47) {
        if (!is_submission) {
            if (is_a) {
                set_a(key);
            } else {
                set_b(key);
            }
        } else if (soft_sub) {
            set_b(key);
        } else {
            reset_calc();
            set_a(key);
        }
    }
    if (charCode >= 42 && charCode <= 45 && charCode !== 44 || charCode === 47) {
        set_o(key);
    }
    if (charCode === 61) {
        submit_calc();
    }
    $('button').each(function () {
        var value = $(this).val();
        if (value === key) {
            animateButton($(this));
        }
    });
});
$(document).keydown(function (e) {
    var charCode = e.which;
    if (charCode === 8) {
        backspace();
        animateButton($('.calc_bac'));
        return false;
    }
    if (charCode === 12 || charCode === 46) {
        reset_calc();
        animateButton($('.calc_cls'));
        return false;
    }
    if (charCode === 13) {
        submit_calc();
        animateButton($('.calc_eval'));
        return false;
    }
});