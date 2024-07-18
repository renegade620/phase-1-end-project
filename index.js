document.addEventListener("DOMContentLoaded", function() {
    let diseasesData = [];

    // fetch and display diseases
    function fetchDiseases() {
        fetch(`http://localhost:3000/diseases`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            diseasesData = data;
        })
        .catch(error => console.error("Error fetching diseases:", error));
    }

    // invokes function
    fetchDiseases();

    // handles form submissions
    document.getElementById("symptomForm").addEventListener("submit", function(event) {
        event.preventDefault();

        const age = document.getElementById("age").value;
        const gender = document.querySelector("input[name='gender']:checked").value;
        const county = document.getElementById("county").value;
        const symptoms = document.getElementById("symptoms").value
            .toLowerCase()
            .split(",")
            .map(s => s.trim());

        checkSymptoms(age, gender, county, symptoms);
    });

    function checkSymptoms(age, gender, county, symptoms) {
        const potentialDiseases = new Set();

        diseasesData.forEach(disease => {
            const matchedSymptoms = disease.symptoms.filter(symptom => 
                symptoms.some(userSymptom => symptom.includes(userSymptom))
            );
            if (matchedSymptoms.length > 0) {
                potentialDiseases.add(disease.name);
            }
        });

        displayResults(potentialDiseases, age, gender, county);
    }

    function displayResults(potentialDiseases, age, gender, county) {
        const resultDiv = document.getElementById("result");
        if (potentialDiseases.size > 0) {
            resultDiv.innerHTML = `
            <p>Age: ${age}\n, Gender: ${gender}\n, County: ${county}\n</p>    
            <h3>Potential Conditions:</h3>
                <ul>${Array.from(potentialDiseases).map(disease => `<li>${disease}</li>`).join("")}</ul>
                <p><strong>Note:</strong> This is symptom checker has been built for educational purposes. Please consult a healthcare professional for accurate diagnosis.</p>
                
            `;
        } else {
            resultDiv.innerHTML = `
                <p>No specific conditions found for the given symptoms. Please consult a healthcare professional for proper evaluation.</p>
            `;
        }
    }
});