document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('muffinForm');
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const imageInput = document.getElementById('image');
    const nameError = document.getElementById('nameError');
    const phoneError = document.getElementById('phoneError');
    const imageError = document.getElementById('imageError');
  
  
      const phoneMask = (value) => {
        const formattedValue = value.replace(/\D/g, '')
          .replace(/^(\d{1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/, '+7($2)$3-$4-$5')
          .substring(0, 16);
        return formattedValue;
    };
      
      phoneInput.addEventListener('input', function(event) {
        event.target.value = phoneMask(event.target.value);
          validatePhone();
      })
      
    nameInput.addEventListener('input', validateName);
    imageInput.addEventListener('change', validateImage);
    form.addEventListener('submit', function(event) {
      event.preventDefault(); // Предотвращаем отправку формы
          
      const nameValid = validateName();
      const phoneValid = validatePhone();
      const imageValid = validateImage();
      
       if(nameValid && phoneValid && imageValid) {
         alert("Форма отправлена")
         //Здесь был бы код для отправки формы, если она была валидна
         //form.submit();
       } else {
         console.log("Ошибка в форме")
       }
    });
  
      function validatePhone() {
        const phoneValue = phoneInput.value;
          
        if(phoneValue.length < 16) {
          phoneError.textContent = "Номер должен быть в формате +7(XXX)XXX-XX-XX";
          return false;
        } else {
          phoneError.textContent = "";
            return true;
        }
      }
  
  
    function validateName() {
      const nameValue = nameInput.value;
      const nameRegex = /^[а-яёА-ЯЁ\s]+$/;
      
      if (!nameRegex.test(nameValue)) {
        nameError.textContent = "Разрешены только русские буквы и пробелы";
          return false;
      } else {
        nameError.textContent = "";
          return true;
      }
    }
  
  
    function validateImage() {
      const allowedExtensions = ['jpg', 'jpeg', 'png', 'bmp'];
      const file = imageInput.files[0];
        
      if (!file) {
          imageError.textContent = "Пожалуйста, загрузите файл";
           return false;
       }
      const fileName = file.name.toLowerCase();
      const fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1);
      
      if (!allowedExtensions.includes(fileExtension)) {
        imageError.textContent = "Разрешены только файлы jpg, jpeg, png и bmp.";
          return false;
      } else {
           imageError.textContent = "";
          return true;
      }
    }
  });
  