const students = [
    { name: "Salmaan Ahmed", marks: 38, class: "3rd", address: "India" },
    { name: "Riya Sharma", marks: 85, class: "10th", address: "123, ABC Colony, Delhi" },
    { name: "Rohan Patel", marks: 70, class: "12th", address: "456, XYZ Street, Mumbai" },
    { name: "Priya Singh", marks: 95, class: "8th", address: "789, PQR Nagar, Bangalore" },
    { name: "Ankit Gupta", marks: 60, class: "9th", address: "101, LMN Road, Kolkata" },
    { name: "Neha Verma", marks: 80, class: "11th", address: "222, DEF Avenue, Chennai" },
    { name: "Manoj Kumar", marks: 75, class: "10th", address: "333, GHI Lane, Hyderabad" },
    { name: "Pooja Mishra", marks: 88, class: "12th", address: "444, STU Colony, Pune" },
    { name: "Rajesh Singhania", marks: 92, class: "9th", address: "555, VWX Street, Jaipur" }
];

function renderStudents(studentList) {
    const container = document.getElementById('studentContainer');
    container.innerHTML = studentList.map(student => `
        <div class="card">
            <p><strong>Student Name:</strong> ${student.name}</p>
            <p><strong>Marks:</strong> ${student.marks}%</p>
            <p><strong>Class:</strong> ${student.class}</p>
            <p><strong>Address:</strong> ${student.address}</p>
        </div>
    `).join('');
}

function filterStudents() {
    const query = document.getElementById('searchBox').value.toLowerCase();
    const filteredStudents = students.filter(student => 
        student.name.toLowerCase().includes(query)
    );
    renderStudents(filteredStudents);
}

// Initial render
document.addEventListener('DOMContentLoaded', () => {
    renderStudents(students);
});
