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
