function renderMenu() {
  document.querySelectorAll('.day-card').forEach(card => {
    const day = card.getAttribute('data-day');
    const slot = card.querySelector('.day-slots');
    slot.innerHTML = '';

    // Переменные для подсчета суточного итога КБЖУ
    let dayCalories = 0, dayProtein = 0, dayFat = 0, dayCarbs = 0;

    if (weeklyMenu[day].length === 0) {
      slot.innerHTML = '<span style="color:#666; font-size:0.8rem;">Рацион не запланирован</span>';
      return;
    }

    weeklyMenu[day].forEach((item, index) => {
      const originalRecipe = recipes.find(r => r.id === item.id);
      
      if (originalRecipe) {
        // Суммируем нутриенты с учетом количества порций на этот день
        dayCalories += originalRecipe.calories * item.servings;
        dayProtein += originalRecipe.protein * item.servings;
        dayFat += originalRecipe.fat * item.servings;
        dayCarbs += originalRecipe.carbs * item.servings;
      }

      const div = document.createElement('div');
      div.className = 'scheduled-item';
      
      const title = document.createElement('span');
      title.textContent = item.name;
      title.style.overflow = 'hidden';
      title.style.textOverflow = 'ellipsis';
      title.style.whiteSpace = 'nowrap';

      const input = document.createElement('input');
      input.type = 'number';
      input.value = item.servings;
      input.min = '1';
      input.style.width = '2.8rem';
      input.style.padding = '0.1rem';
      input.style.marginInline = '0.3rem';
      input.addEventListener('change', (e) => {
        updateMenuServings(day, index, e.target.value);
        renderMenu(); // Перерисовываем, чтобы обновить суточные итоги
      });

      const remBtn = document.createElement('span');
      remBtn.textContent = '❌';
      remBtn.style.cursor = 'pointer';
      remBtn.addEventListener('click', () => removeFromMenu(day, index));

      div.append(title, input, remBtn);
      slot.append(div);
    });

    // Добавляем блок суточного итога КБЖУ внизу карточки дня
    const totalDiv = document.createElement('div');
    totalDiv.style.marginTop = '0.5rem';
    totalDiv.style.paddingTop = '0.5rem';
    totalDiv.style.borderTop = '1px dashed #555';
    totalDiv.style.fontSize = '0.8rem';
    totalDiv.style.color = '#4ec9b0';
    totalDiv.innerHTML = `Итог дня: 🔥${dayCalories}ккал | Б:${dayProtein}г | Ж:${dayFat}г | У:${dayCarbs}г`;
    slot.append(totalDiv);
  });
}
