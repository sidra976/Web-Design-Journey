let selectedCurrency = 'USD'; // Default currency

        document.querySelectorAll('.currency-btn').forEach(button => {
            button.addEventListener('click', function() {
                // Remove 'active' class from all buttons
                document.querySelectorAll('.currency-btn').forEach(btn => btn.classList.remove('active'));

                // Add 'active' class to the clicked button
                this.classList.add('active');

                // Get currency from data attribute
                selectedCurrency = this.getAttribute('data-currency');
            });
        });

        document.getElementById('btn').addEventListener('click', function() {
            calculateSavings(selectedCurrency);
        });

        function calculateSavings(currency) {
            const startingBalance = parseFloat(document.getElementById('startingBalance').value) || 0;
            const monthlyContribution = parseFloat(document.getElementById('monthlyContribution').value) || 0;
            const period = parseFloat(document.getElementById('period').value) || 0;
            const annualInterest = parseFloat(document.getElementById('annualInterest').value) || 0;

            // Check whether 'Years' or 'Months' is selected
            const isPeriodInYears = document.getElementById('years').checked;
            let totalMonths = isPeriodInYears ? period * 12 : period;
            let monthlyRate = annualInterest / 12 / 100; // Convert annual rate to monthly

            let finalSaving = startingBalance;

            // Apply compound interest monthly
            for (let i = 0; i < totalMonths; i++) {
                finalSaving += monthlyContribution;
                finalSaving += finalSaving * monthlyRate;
            }

            // Choose the correct currency symbol
            const currencySymbols = { 'EUR': '€', 'USD': '$', 'UAH': '₴' };
            let currencySymbol = currencySymbols[currency] || '$'; // Default to USD if unknown

            // Display the result
            document.getElementById('res').innerText = `${currencySymbol}${finalSaving.toFixed(2)}`;
        }