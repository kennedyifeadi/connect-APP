function displayImage(input) {
    let file = input.files[0];
    let profilePicture = document.getElementById('profilePicture');
    let profilePictureContainer = document.getElementById('profilePictureContainer');
    let dummyFigure = document.querySelector('.dummyfigure')

    if (file) {
        let reader = new FileReader();

        reader.onload = function(e) {
            dummyFigure.style.display = 'none';
            profilePicture.src = e.target.result;
            profilePicture.style.opacity = '1';
            profilePictureContainer.style.display = 'block';
        }

        reader.readAsDataURL(file);
    } else {
        profilePictureContainer.style.display = 'none';
    }
}

// let labelBox = document.querySelectorAll('.labelBox')
// let interestBox = document.querySelectorAll('.checked');

// interestBox.forEach(box =>{
//     box.addEventListener('click', ()=>{
//         labelBox.forEach(label =>{
//             // label.target.classList.toggle('labelChecked')
            
//         })
//     })
    
// })

const labelBoxes = document.querySelectorAll('.labelBox');

labelBoxes.forEach(labelBox => {
    const checkbox = labelBox.querySelector('input[type="checkbox"]');

    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            labelBox.classList.add('labelChecked');
        } else {
            labelBox.classList.remove('labelChecked');
        }
    });
});
