import process from 'node:process';
import { defineConfig, devices } from '@playwright/test';

/**
 * При необходимости переменные окружения можно загрузить из файла.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * Документация по настройке Playwright: https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './e2e',
  /* Максимальное время выполнения одного теста. */
  timeout: 30 * 1000,
  expect: {
    /**
     * Максимальное время ожидания условия в expect().
     * Например, при проверке текста через expect().
     */
    timeout: 5000,
  },
  /* В CI запрещён запуск тестов с test.only. */
  forbidOnly: !!process.env.CI,
  /* Повторные попытки запуска — только в CI. */
  retries: process.env.CI ? 2 : 0,
  /* В CI тесты запускаются последовательно. */
  workers: process.env.CI ? 1 : undefined,
  /* Формат отчёта о тестах: https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Общие настройки для всех браузеров. */
  use: {
    /* Максимальное время действия (0 — без ограничения). */
    actionTimeout: 0,
    /* Базовый адрес приложения для тестов. */
    baseURL: process.env.CI ? 'http://localhost:4173' : 'http://localhost:5173',

    /* При повторном запуске теста сохраняется трассировка. */
    trace: 'on-first-retry',

    /* В CI браузер запускается без интерфейса. */
    headless: !!process.env.CI,
  },

  /* Настройки тестирования в основных браузерах. */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
    },
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
      },
    },

    /* Дополнительные тесты на мобильных размерах экрана (пока отключены). */
    // {
    //   name: 'Mobile Chrome',
    //   use: {
    //     ...devices['Pixel 5'],
    //   },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: {
    //     ...devices['iPhone 12'],
    //   },
    // },

    /* Дополнительные браузеры для тестирования (пока отключены). */
    // {
    //   name: 'Microsoft Edge',
    //   use: {
    //     channel: 'msedge',
    //   },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: {
    //     channel: 'chrome',
    //   },
    // },
  ],

  /* Папка для отчётов, скриншотов и других результатов тестирования. */
  // outputDir: 'test-results/',

  /* Перед тестами запускается локальный сервер приложения. */
  webServer: {
    /**
     * Локально используется сервер разработки для быстрого запуска.
     * В CI используется сервер предварительного просмотра сборки.
     * Playwright использует уже запущенный локальный сервер, если он доступен.
     */
    command: process.env.CI ? 'npm run preview' : 'npm run dev',
    port: process.env.CI ? 4173 : 5173,
    reuseExistingServer: !process.env.CI,
  },
});
