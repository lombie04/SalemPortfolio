document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    alert('Your data has been safely stored.');
   
    document.getElementById('fname').value = '';
    document.getElementById('lname').value = '';
    document.getElementById('contact').value = '';
    document.getElementById('email').value = '';
    document.getElementById('country').selectedIndex = 0;
    document.getElementById('subject').value = '';
 });