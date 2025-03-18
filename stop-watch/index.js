const timerDisplay = document.querySelector('.timer');
        const canvas = document.getElementById("progress");
        const ctx = canvas.getContext("2d");
        const startBtn = document.getElementById("start");
        const stopBtn = document.getElementById("stop");
        const resetBtn = document.getElementById("reset");

        let seconds = 0, minutes = 0, hours = 0, interval;
        canvas.width = canvas.height = 200;

        function updateTimer() {
            seconds++;
            if (seconds === 60) { minutes++; seconds = 0; }
            if (minutes === 60) { hours++; minutes = 0; }
            timerDisplay.innerText = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
            drawProgress();
        }

        function pad(value) {
            return value < 10 ? `0${value}` : value;
        }

        function drawProgress() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        
            let gradient = ctx.createLinearGradient(100, 200, 100, 0);
            gradient.addColorStop(0, "#30cfd0");  // Bottom color (light blue)
            gradient.addColorStop(1, "#330867");  // Top color (deep purple)
            
            let endAngle = (-Math.PI / 2) + ((seconds / 60) * 2 * Math.PI);
            
            ctx.beginPath();
            ctx.arc(100, 100, 90, -Math.PI / 2, endAngle);
            ctx.lineWidth = 10;
            ctx.strokeStyle = gradient;
            ctx.lineCap = "round";
            ctx.stroke();
        }
        
        function animateProgress() {
            let start = performance.now();
            function step(timestamp) {
                let progress = (timestamp - start) / 1000;
                if (progress < 1) {
                    requestAnimationFrame(step);
                }
                drawProgress();
            }
            requestAnimationFrame(step);
        }

        startBtn.addEventListener("click", () => {
            if (!interval) {
                interval = setInterval(() => {
                    updateTimer();
                    animateProgress();
                }, 1000);
            }
        });

        stopBtn.addEventListener("click", () => {
            clearInterval(interval);
            interval = null;
        });

        resetBtn.addEventListener("click", () => {
            clearInterval(interval);
            interval = null;
            seconds = minutes = hours = 0;
            timerDisplay.innerText = "00:00:00";
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        });