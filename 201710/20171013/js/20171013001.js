var obj = {
   getLength: function(s) {
     var totalLength = 0;
     var i;
     var charCode;
     for (i = 0; i < s.length; i++) {
       charCode = s.charCodeAt(i);
       if (charCode == 10) { // 处理回车键
         totalLength += 2;
       } else if (charCode < 0x007f) {
         totalLength = totalLength + 1;
       } else if ((0x0080 <= charCode) && (charCode <= 0x07ff)) {
         totalLength += 2;
       } else if ((0x0800 <= charCode) && (charCode <= 0xffff)) {
         totalLength += 3;
       }
     }
     return totalLength;
   }
}