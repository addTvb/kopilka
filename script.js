document.addEventListener('DOMContentLoaded', () => {
    const daysInput = document.getElementById('days');
    const startButton = document.getElementById('start');
    const checkboxesContainer = document.getElementById('checkboxes');
    const totalAmountElement = document.getElementById('totalAmount');
    const savedAmountElement = document.getElementById('savedAmount');
    const remainingAmountElement = document.getElementById('remainingAmount');
    const progressBar = document.getElementById('progressBar');
    const depositAmountInput = document.getElementById('depositAmount');
    const depositBtn = document.getElementById('depositBtn');
    const depositMessage = document.getElementById('depositMessage');
    const celebrationSound = document.getElementById('celebrationSound');
    
    let totalDays = 365;
    let totalAmount = 0;
    let savedAmount = 0;
    let remainingAmount = 0;
    let hasShownCelebration = false;
    
    // Load saved state from localStorage if available
    function loadSavedState() {
        const savedState = localStorage.getItem('kopilkaState');
        if (savedState) {
            const state = JSON.parse(savedState);
            totalDays = state.totalDays || 365;
            savedAmount = state.savedAmount || 0;
            hasShownCelebration = state.hasShownCelebration || false;
            daysInput.value = totalDays;
            
            // Generate checkboxes
            generateCheckboxes();
            
            // Check the saved checkboxes
            if (state.checkedDays && state.checkedDays.length > 0) {
                state.checkedDays.forEach(day => {
                    const checkbox = document.getElementById(`day-${day}`);
                    if (checkbox) {
                        checkbox.checked = true;
                    }
                });
            }
            
            updateSummary();
        }
    }
    
    // Save current state to localStorage
    function saveState() {
        const checkedDays = [];
        document.querySelectorAll('.checkbox-input:checked').forEach(checkbox => {
            const day = parseInt(checkbox.getAttribute('data-day'));
            checkedDays.push(day);
        });
        
        const state = {
            totalDays,
            savedAmount,
            checkedDays,
            hasShownCelebration
        };
        
        localStorage.setItem('kopilkaState', JSON.stringify(state));
    }
    
    // Calculate the total amount needed
    function calculateTotalAmount(days) {
        return (days * (days + 1)) / 2;
    }
    
    // Generate checkboxes based on the number of days
    function generateCheckboxes() {
        checkboxesContainer.innerHTML = '';
        totalAmount = calculateTotalAmount(totalDays);
        remainingAmount = totalAmount - savedAmount;
        
        totalAmountElement.textContent = totalAmount;
        
        for (let i = 1; i <= totalDays; i++) {
            const checkboxWrapper = document.createElement('div');
            checkboxWrapper.className = 'checkbox-wrapper';
            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'checkbox-input';
            checkbox.id = `day-${i}`;
            checkbox.setAttribute('data-day', i);
            
            const label = document.createElement('label');
            label.className = 'checkbox-label';
            label.setAttribute('for', `day-${i}`);
            label.textContent = i;
            
            checkboxWrapper.appendChild(checkbox);
            checkboxWrapper.appendChild(label);
            checkboxesContainer.appendChild(checkboxWrapper);
            
            checkbox.addEventListener('change', function() {
                if (this.checked) {
                    savedAmount += parseInt(this.getAttribute('data-day'));
                } else {
                    savedAmount -= parseInt(this.getAttribute('data-day'));
                }
                updateSummary();
                saveState();
            });
        }
    }
    
    // Update the summary section
    function updateSummary() {
        savedAmountElement.textContent = savedAmount;
        remainingAmount = totalAmount - savedAmount;
        remainingAmountElement.textContent = remainingAmount;
        const progressPercentage = (savedAmount / totalAmount) * 100;
        progressBar.style.width = `${progressPercentage}%`;
        
        // Проверка на достижение целевой суммы
        if (savedAmount >= totalAmount && !hasShownCelebration) {
            showCelebration();
        }
    }
    
    // Функция для запуска конфетти и звука при достижении цели
    function showCelebration() {
        hasShownCelebration = true;
        saveState();
        
        // Запуск звука
        if (celebrationSound) {
            celebrationSound.play().catch(e => console.log('Ошибка воспроизведения звука:', e));
        }
        
        // Запуск конфетти
        launchConfetti();
        
        // Показ сообщения о поздравлении
        depositMessage.textContent = 'Поздравляем! Вы достигли своей цели накопления!';
        depositMessage.className = 'deposit-message success celebration-message';
        
        // Убираем класс celebration-message через 10 секунд, но оставляем success
        setTimeout(() => {
            depositMessage.className = 'deposit-message success';
        }, 10000);
    }
    
    // Функция для запуска анимации конфетти
    function launchConfetti() {
        const duration = 8 * 1000; // 8 секунд
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };
        
        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }
        
        // Начальный залп конфетти со всех сторон
        confetti({
            particleCount: 150,
            spread: 180,
            origin: { x: 0.5, y: 0.5 }
        });
        
        // Продолжительная анимация конфетти с разных сторон
        const interval = setInterval(function() {
            const timeLeft = animationEnd - Date.now();
            
            if (timeLeft <= 0) {
                return clearInterval(interval);
            }
            
            const particleCount = 50 * (timeLeft / duration);
            
            // Конфетти слева
            confetti(Object.assign({}, defaults, {
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
                colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff']
            }));
            
            // Конфетти справа
            confetti(Object.assign({}, defaults, {
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
                colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff']
            }));
            
            // Конфетти снизу
            confetti(Object.assign({}, defaults, {
                particleCount: particleCount / 2,
                origin: { x: randomInRange(0.2, 0.8), y: 1 },
                gravity: -1, // Летят вверх
                colors: ['#ff9900', '#9900ff', '#00ffff', '#ff6699']
            }));
        }, 250);
        
        // Финальный залп конфетти
        setTimeout(() => {
            confetti({
                particleCount: 200,
                spread: 180,
                origin: { x: 0.5, y: 0.5 },
                colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#ff9900', '#9900ff', '#00ffff']
            });
        }, duration - 1000);
    }
    
    // Get all unchecked boxes sorted by value
    function getUncheckedBoxes() {
        const uncheckedBoxes = [];
        document.querySelectorAll('.checkbox-input:not(:checked)').forEach(checkbox => {
            uncheckedBoxes.push({
                element: checkbox,
                value: parseInt(checkbox.getAttribute('data-day'))
            });
        });
        
        // Sort by value from highest to lowest
        return uncheckedBoxes.sort((a, b) => b.value - a.value);
    }
    
    // Calculate remaining space in the piggy bank
    function getRemainingSpace() {
        return totalAmount - savedAmount;
    }
    
    // Automatically fill checkboxes based on deposit amount
    function autoFillCheckboxes(amount) {
        // Clear previous messages
        depositMessage.textContent = '';
        depositMessage.className = 'deposit-message';
        
        // Check if amount exceeds the total remaining space
        const remainingSpace = getRemainingSpace();
        if (amount > remainingSpace) {
            showDepositMessage(`Сумма ${amount} превышает оставшееся место в копилке (${remainingSpace}). Максимально можно внести ${remainingSpace}.`, 'error');
            return;
        }
        
        // Get all unchecked boxes and sort them by value (highest first)
        const uncheckedBoxes = getUncheckedBoxes();
        
        if (uncheckedBoxes.length === 0) {
            showDepositMessage('Все дни уже отмечены!', 'error');
            return;
        }
        
        let remainingAmount = amount;
        let filledBoxes = [];
        
        // Try to find exact matches first (greedy algorithm)
        for (let i = 0; i < uncheckedBoxes.length; i++) {
            const box = uncheckedBoxes[i];
            
            if (box.value === remainingAmount) {
                // Found exact match
                box.element.checked = true;
                filledBoxes.push(box);
                remainingAmount = 0;
                break;
            }
        }
        
        // If no exact match found, use greedy approach from largest to smallest
        if (remainingAmount > 0) {
            for (let i = 0; i < uncheckedBoxes.length; i++) {
                const box = uncheckedBoxes[i];
                
                if (box.value <= remainingAmount) {
                    box.element.checked = true;
                    filledBoxes.push(box);
                    remainingAmount -= box.value;
                    
                    if (remainingAmount === 0) {
                        break;
                    }
                }
            }
        }
        
        // Update saved amount and summary
        if (filledBoxes.length > 0) {
            savedAmount += amount - remainingAmount;
            updateSummary();
            saveState();
            
            if (remainingAmount > 0) {
                showDepositMessage(`Сумма ${amount - remainingAmount} успешно внесена. Остаток: ${remainingAmount}. Осталось накопить: ${getRemainingSpace()}.`, 'success');
            } else {
                showDepositMessage(`Сумма ${amount} успешно внесена! Осталось накопить: ${getRemainingSpace()}.`, 'success');
            }
        } else {
            showDepositMessage(`Не удалось распределить сумму ${amount}. Попробуйте другую сумму.`, 'error');
        }
    }
    
    // Show deposit message
    function showDepositMessage(text, type) {
        depositMessage.textContent = text;
        depositMessage.className = `deposit-message ${type}`;
        
        // Hide message after 5 seconds
        setTimeout(() => {
            depositMessage.className = 'deposit-message';
        }, 5000);
    }
    
    // Event listener for the deposit button
    depositBtn.addEventListener('click', () => {
        const amount = parseInt(depositAmountInput.value);
        if (!amount || amount <= 0) {
            showDepositMessage('Пожалуйста, введите корректную сумму', 'error');
            return;
        }
        
        autoFillCheckboxes(amount);
        depositAmountInput.value = '';
    });
    
    // Event listener for the start button
    startButton.addEventListener('click', () => {
        totalDays = parseInt(daysInput.value) || 365;
        savedAmount = 0; // Reset saved amount when generating new checkboxes
        hasShownCelebration = false; // Сброс флага поздравления
        generateCheckboxes();
        updateSummary();
        saveState();
    });
    
    // Load saved state when the page loads
    loadSavedState();
    
    // If no saved state, generate default checkboxes
    if (checkboxesContainer.children.length === 0) {
        generateCheckboxes();
        updateSummary();
    }
}); 