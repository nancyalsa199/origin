function claculate(mathmatic_operation){

    //التحقق من صحة كتابة المعادلة الرياضية
    const regex = /^\s*[+-]?(\d+(\.\d+)?)(\s*[+\-*/]\s*[+-]?(\d+(\.\d+)?))*\s*$/;
    if(! regex.test(mathmatic_operation)){
        return 'unvalid input';
    }

    //استخراج الأرقام و المعاملات الرياضية
    let number='';
    let numbers=[];
    let operands=[];
    for(let counter=0;counter<mathmatic_operation.length;counter++){
        while(mathmatic_operation[counter]>='0' && mathmatic_operation[counter]<='9' || mathmatic_operation[counter]=='.'){
            number=number+mathmatic_operation[counter];
            counter++;
        }
        if(!(counter >= mathmatic_operation.length)){
            operands.push(mathmatic_operation[counter])
        }
        numbers.push(parseFloat(number))
        number = '';
    }
    
    // تقييم ناتج الضرب و القسمة
    for (let i = 0; i < operands.length; i++) {
        if (operands[i] === '*' || operands[i] === '/') {
            let temp;
            if (operands[i] === '*') {
                temp = numbers[i] * numbers[i + 1];
            } else {
                temp = numbers[i] / numbers[i + 1];
            }
            // استبدال الرقمين الناتجين بالنتيجة داخل مصفوفة الأرقام
            numbers.splice(i, 2, temp);
            // إزالة المعامل الذي تم استخدامه
            operands.splice(i, 1);
            i--; // إعادة تقييم الموضع الحالي بعد التعديل في المصفوفة
        }
    }
    
    // تقييم ناتج الجمع و الطرح
    let result = numbers[0];
    for (let i = 0; i < operands.length; i++) {
        if (operands[i] === '+') {
            result += numbers[i + 1];
        } else if (operands[i] === '-') {
            result -= numbers[i + 1];
        }
    }
    return result

}