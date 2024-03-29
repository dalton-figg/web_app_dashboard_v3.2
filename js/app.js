const lineChart = document.getElementById('line-chart');
const barChart = document.getElementById('bar-chart');
const pieChart = document.getElementById('pie-chart');

// MAIN LINE CHART

const lineChartObj = new Chart(lineChart, {
  type: 'line',
  data: {
    labels: [
      '16-22',
      '23-29',
      '30-5',
      '6-12',
      '13-19',
      '20-26',
      '27-3',
      '4-10',
      '11-17',
      '18-24',
      '25-31',
    ],
    datasets: [
      {
        data: [650, 1250, 1000, 2000, 1500, 1750, 1250, 1700, 2200, 1500, 2500],
        fill: true,
        borderColor: '#97adad',
        label: 'Hourly',
        tension: 0.5,
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  },
});

// BAR CHART

new Chart(barChart, {
  type: 'bar',
  data: {
    labels: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    datasets: [
      {
        label: 'Daily Traffic',
        data: [75, 110, 160, 120, 230, 200, 100],
        borderWidth: 1,
      },
    ],
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  },
});

// DOUGHNUT CHART

new Chart(pieChart, {
  type: 'doughnut',
  data: {
    labels: ['Desktop', 'Tablet', 'Phones'],
    datasets: [
      {
        label: 'Mobile Users',
        data: [280, 50, 50],
        backgroundColor: ['#4d4b71', '#71C464', '#64B9C4'],
        hoverOffset: 4,
      },
    ],
  },

  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
    },
  },
});

// CHANGE CANVAS

const trafficButtonsParent = document.querySelector('.traffic-buttons');
// Array from children so that we can use iterators
const trafficButtons = Array.from(trafficButtonsParent.children);

// Remove active class from all buttons

const resetButtonClasses = () =>
  trafficButtons.forEach((button) => (button.className = 'traffic-button'));

// Add active class to clicked button

const setActiveButton = (target) => (target.className += ' active');

// Updates the data based on which button you selected

const updateData = (dataset) => {
  switch (dataset) {
    case 'Daily': {
      lineChartObj.data.labels = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
      ];

      lineChartObj.data.datasets[0].data = [1750, 1250, 1700, 2200, 1250];

      break;
    }

    case 'Hourly': {
      lineChartObj.data.labels = [
        '16-22',
        '23-29',
        '30-5',
        '6-12',
        '13-19',
        '20-26',
        '27-3',
        '4-10',
        '11-17',
        '18-24',
        '25-31',
      ];

      lineChartObj.data.datasets[0].data = [
        650, 1250, 1000, 2000, 1500, 1750, 1250, 1700, 2200, 1500, 2500,
      ];
      break;
    }

    case 'Weekly': {
      lineChartObj.data.labels = [
        '1/12',
        '8/12',
        '15/12',
        '23/12',
        '31/12',
        '7/1',
        '14/1',
        '21/1',
      ];

      lineChartObj.data.datasets[0].data = [
        650, 1250, 1750, 1250, 1700, 2200, 1500, 2500,
      ];
      break;
    }

    case 'Monthly': {
      lineChartObj.data.labels = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Nov',
        'Dec',
      ];

      lineChartObj.data.datasets[0].data = [
        1750, 1250, 1700, 2200, 1500, 2500, 800, 1500, 300, 2000, 1300, 1600,
      ];
      break;
    }
  }

  lineChartObj.update();
};

trafficButtonsParent.addEventListener('click', (e) => {
  // Fixes a bug where clicking on the parent element causes issues
  if (e.target.className === 'traffic-button') {
    resetButtonClasses();
    setActiveButton(e.target);
    updateData(e.target.innerHTML);
  }
});

// Includes an alert icon in the header with a marker to notify the user of new alerts and messages.

const notificationBell = document.querySelector(
  '.primary-header__notifications'
);

const notificationModal = document.querySelector('.notifications-modal');

const notificationsClose = document.getElementById('closeNotifications');

const openNotificationsModal = () =>
  (notificationModal.style.display = 'block');

const closeNotificationsModal = () =>
  (notificationModal.style.display = 'none');

notificationBell.addEventListener('click', () => openNotificationsModal());

notificationsClose.addEventListener('click', () => closeNotificationsModal());

// Includes alert banner that user can close.

const alertBanner = document.querySelector('.alert');
const closeAlert = document.getElementById('closeAlert');

closeAlert.addEventListener('click', () => alertBanner.remove());

// Message User autocompletion

const members = ['victoria chambers', 'dale byrd', 'dawn wood', 'dan oliver'];
const autocompleteList = document.querySelector('.autocompleted-users');
const searchForUserInput = document.getElementById('userSearch');

searchForUserInput.addEventListener('keyup', (e) => {
  let searchedUser = e.target.value.toLowerCase();

  const matchedMembers = members.filter((member) =>
    member.toLowerCase().includes(searchedUser)
  );

  autocompleteList.style.display = 'block';
  autocompleteList.innerHTML = '';

  autocompleteList.innerHTML = matchedMembers
    .map((member) => `<p>${member}</p>`)
    .join('');
});

autocompleteList.addEventListener('click', (e) => {
  if (e.target.tagName === 'P') {
    searchForUserInput.value = e.target.innerHTML;
    autocompleteList.style.display = 'none';
  }
});

// Validate form

const submitMessageButton = document.getElementById('submitMessage');
const messageForm = submitMessageButton.parentNode;
const messageFormInputs = Array.from(
  messageForm.querySelectorAll('input, textarea')
);

const [messageFormUser, messageFormMessage] = messageFormInputs;

const errorMessage = document.getElementById('message-error-msgs');

submitMessageButton.addEventListener('click', (e) => {
  e.preventDefault();

  errorMessage.style.display = 'block';

  if (!messageFormUser.value && !messageFormMessage.value) {
    errorMessage.innerHTML = `Error: Both input fields are blank!`;
  } else if (!messageFormUser.value && messageFormMessage.value) {
    errorMessage.innerHTML = `Error: Your user input field is blank!`;
  } else if (messageFormUser.value && !messageFormMessage.value) {
    errorMessage.innerHTML = `Error: Your message input field is blank!`;
  } else {
    errorMessage.innerHTML = `Your message was successfully sent to the user ${messageFormUser.value}!`;
    messageFormMessage.value = '';
    messageFormUser.value = '';
  }
});

// Settings with local storage

const settingsButtons = document.querySelector('.form-buttons');
const [saveSettings, clearSettings] = settingsButtons.children;

const selectTimezone = document.getElementById('timezone');
const emailNotifications = document.getElementById('emailNotifs');
const publicProfile = document.getElementById('publicProfile');

const saveSettingsHandler = (e) => {
  e.preventDefault();

  const emailNotificationsChecked  = emailNotifications.checked;
  const publicProfileChecked = publicProfile.checked;
  const preferredTimezone = selectTimezone.value;

  localStorage.setItem('emailNotificationsAllowed', emailNotificationsChecked);
  localStorage.setItem('isProfilePublic', publicProfileChecked);
  localStorage.setItem('preferredTimezone', preferredTimezone);
};

const clearSettingsHandler = () => {
  alert('All settings cleared from local storage!');
  localStorage.clear();
  selectTimezone.value = 'BST';
  emailNotifications.checked = false;
  publicProfile.checked = false;
};

saveSettings.addEventListener('click', saveSettingsHandler);
clearSettings.addEventListener('click', clearSettingsHandler);

// Set settings on page load

if (localStorage.getItem('emailNotificationsAllowed')) {
  const emailNotificationsAllowed =
    localStorage.getItem('emailNotificationsAllowed') === 'true';
  emailNotifications.checked = emailNotificationsAllowed;
}

if (localStorage.getItem('preferredTimezone')) {
  selectTimezone.value = localStorage.getItem('preferredTimezone');
}

if (localStorage.getItem('isProfilePublic')) {
  const isProfilePublicChecked = localStorage.getItem('isProfilePublic') === 'true';
  publicProfile.checked = isProfilePublicChecked; 
}
