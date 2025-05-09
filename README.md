# Копилка

Веб-приложение для отслеживания накоплений с визуализацией прогресса и праздничной анимацией при достижении цели.

## Функции

- Настройка целевой суммы через выбор количества дней
- Визуальная сетка для отмечания накопленных сумм
- Подсказки по оптимальному заполнению
- Прогресс-бар для наглядного отображения накоплений
- Праздничная анимация с конфетти и звуком при достижении цели
- Автоматическое сохранение состояния в браузере

## Использование на GitHub Pages

Чтобы запустить это приложение на GitHub Pages:

1. Склонируйте репозиторий на свой компьютер
2. Создайте новый репозиторий на GitHub
3. Добавьте ваш удаленный репозиторий:
   ```
   git remote add origin https://github.com/ваш-логин/ваш-репозиторий.git
   ```
4. Отправьте код в репозиторий:
   ```
   git add .
   git commit -m "Первая версия Копилки"
   git push -u origin main
   ```
5. В настройках вашего репозитория на GitHub:
   - Перейдите в раздел "Pages"
   - В разделе "Source" выберите "Deploy from a branch"
   - Выберите ветку "main" и директорию "/ (root)"
   - Нажмите "Save"

После нескольких минут ваше приложение будет доступно по адресу: 
https://ваш-логин.github.io/ваш-репозиторий/

## Локальный запуск

Просто откройте файл `index.html` в браузере.

## Технологии

- HTML5, CSS3, JavaScript
- LocalStorage для сохранения данных
- Canvas Confetti для анимации празднования
- Полностью адаптивный дизайн (мобильный и десктоп)

## Описание

Это приложение поможет вам вести учет накоплений по дням. Принцип работы основан на методе накоплений, когда каждый день вы откладываете сумму, равную номеру этого дня (1 рубль в первый день, 2 рубля во второй день и т.д.).

## Возможности

- Настройка количества дней для накоплений (по умолчанию 365 дней)
- Визуальное отображение прогресса в виде чекбоксов
- Автоматический подсчет итоговой необходимой суммы
- Отслеживание уже накопленной суммы
- Автоматическое сохранение состояния в локальном хранилище браузера
- Внесение произвольной суммы с автоматическим заполнением чекбоксов

## Как использовать

1. Откройте файл `index.html` в любом современном браузере
2. Введите желаемое количество дней для накопления или оставьте значение по умолчанию (365 дней)
3. Нажмите кнопку "Начать"
4. По мере накопления средств нажимайте на соответствующие кнопки с номерами дней
5. Отмеченные дни будут считаться оплаченными, их сумма будет добавлена к общей накопленной сумме
6. Вы также можете внести произвольную сумму в поле "Внести сумму" - приложение автоматически заполнит неотмеченные ячейки, начиная с самых больших значений
7. Если останется неиспользованный остаток, приложение сообщит об этом
8. Прогресс автоматически сохраняется в браузере

## Формула расчета

Итоговая сумма рассчитывается по формуле арифметической прогрессии:
```
Сумма = (n * (n + 1)) / 2
```
где n - количество дней.

Например, для 365 дней итоговая сумма составит 66795. 