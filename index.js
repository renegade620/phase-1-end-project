document.addEventListener("DOMContentLoaded", function() { // fires up when page loads
    alert("Page is ready!");

    let diseasesData = []; // array to store db contents

    // fetch and display diseases
    function fetchDiseases() {
        fetch(`http://localhost:3000/diseases`) // url of json-server
        .then(response => response.json())
        .then(data => {
            console.log(data);
            diseasesData = data;
        })
        .catch(error => console.error("Error fetching diseases:", error)); // logs error to the user
    }

    // invokes function
    fetchDiseases();

    // handles form submissions
    document.getElementById("symptomForm").addEventListener("submit", function(event) {
        event.preventDefault(); // prevents submit's default which reloads the page

        // accept inputs from the client side 
        const age = document.getElementById("age").value;
        const gender = document.querySelector("input[name='gender']:checked").value;
        const county = document.getElementById("county").value;
        const symptoms = document.getElementById("symptoms").value
            .toLowerCase()
            .split(",")
            .map(s => s.trim());

        checkSymptoms(age, gender, county, symptoms); // invokes function that checks symptoms against diseases
    });

    // a function that checks symptoms against diseases
    function checkSymptoms(age, gender, county, symptoms) {
        const potentialDiseases = new Set(); // init to an empty set

        // iterates through every disease object
        diseasesData.forEach(disease => {
            const matchedSymptoms = disease.symptoms.filter(symptom => // filter method is used to match the user's symptoms and the potential diseases
                symptoms.some(userSymptom => symptom.includes(userSymptom))
            );
            if (matchedSymptoms.length > 0) { // for any matched symptom, that disease is returned
                potentialDiseases.add(disease.name); // add method
            }
        });

        displayResults(potentialDiseases, age, gender, county); // invokes function that displays data
    }

    function displayResults(potentialDiseases, age, gender, county) {
        const resultDiv = document.getElementById("result");
        if (potentialDiseases.size > 0) {
            resultDiv.innerHTML = `
            <p>Age: ${age}\n, Gender: ${gender}\n, County: ${county}\n</p>    
            <h3>Potential Conditions:</h3>
                <ul>${Array.from(potentialDiseases).map(disease => `<li>${disease}</li>`).join("")}</ul>
                <p><strong>Note:</strong> This is symptom checker has been built for educational purposes. Please consult a healthcare professional for accurate diagnosis.</p>
                
            `; // populates the result's div
        } else {
            resultDiv.innerHTML = `
                <p>No specific conditions found for the given symptoms. Please consult a healthcare professional for proper evaluation.</p>
            `;
        }
    }
});