using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using ApplicationContext;
using Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using NUnit.Framework;

namespace NUnitAutoTests
{
    [TestFixture]
    public class TodoItemTest
    {
        private IWebDriver _webDriver;
        private List<TodoItem> _todoItems;
        private List<User> _users;
        private static readonly DbContextOptionsBuilder OptionsBuilder = new DbContextOptionsBuilder<AppDbContext>();

        readonly DbContextOptions _options = OptionsBuilder
            .UseSqlServer(
                @"Server=localhost;Database=TodoListAppDb;Trusted_Connection=True;MultipleActiveResultSets=true")
            .Options;

        [SetUp]
        public void SetUp()
        {
            var service =
                ChromeDriverService.CreateDefaultService(@"C:\Users\Vladislav Avanesov\Downloads\chromedriver_win32");

            service.HideCommandPromptWindow = true;
            _webDriver = new ChromeDriver(service);


            using (var db = new AppDbContext(_options))
            {
                _todoItems = db.TodoItems.ToList();
                _users = db.Users.ToList();
            }
        }


        [TearDown]
        protected void TearDown()
        {
            _webDriver.Quit();
        }

        [Test]
        public void AddTodoItem()
        {
            using (var db = new AppDbContext(_options))
            {
                _todoItems = db.TodoItems.ToList();
                _users = db.Users.ToList();
            }

            var actual = _todoItems.Count;
            _webDriver.Navigate().GoToUrl("https://localhost:5001");
            _webDriver.Manage().Window.Size = new System.Drawing.Size(1920, 1040);
            _webDriver.FindElement(By.Id("email")).SendKeys("001231avaneszdes@gmail.com");
            _webDriver.FindElement(By.Id("password")).SendKeys("0031231qwe!@#QWE");
            _webDriver.FindElement(By.CssSelector("#signIn > .MuiButton-label")).Click();
            Thread.Sleep(300);
            _webDriver.FindElement(By.CssSelector("#createItem > .MuiButton-label")).Click();
            _webDriver.FindElement(By.Id("createItemText")).SendKeys("new item");
            _webDriver.FindElement(By.CssSelector("div > div:nth-child(3) > .MuiButton-contained > .MuiButton-label"))
                .Click();

            var expected = actual + 1;
            Assert.AreNotEqual(actual, expected);
        }


        [Test]
        public void DeleteTodoItem()
        {
            using (var db = new AppDbContext(_options))
            {
                _todoItems = db.TodoItems.ToList();
                _users = db.Users.ToList();
            }

            var actual = _todoItems.Count;

            _webDriver.Navigate().GoToUrl("https://localhost:5001/");
            _webDriver.Manage().Window.Size = new System.Drawing.Size(1916, 1040);
            _webDriver.FindElement(By.Id("email")).SendKeys("001231avaneszdes@gmail.com");
            _webDriver.FindElement(By.Id("password")).SendKeys("0031231qwe!@#QWE");
            _webDriver.FindElement(By.CssSelector(".MuiButton-contained > .MuiButton-label")).Click();
            Thread.Sleep(300);
            _webDriver.FindElement(
                    By.CssSelector(".MuiPaper-root:nth-child(1) .MuiButtonBase-root:nth-child(2) .MuiSvgIcon-root"))
                .Click();

            var expected = actual - 1;
            Assert.AreNotEqual(actual, expected);
        }

        [Test]
        public void UpdateTodoItem()
        {
            using (var db = new AppDbContext(_options))
            {
                _todoItems = db.TodoItems.ToList();
                _users = db.Users.ToList();
            }

            var lastItemText = _todoItems.Last().Text;
            var items = _users.FirstOrDefault(x => x.Email == "001231avaneszdes@gmail.com").TodoItems.Count;

            _webDriver.Navigate().GoToUrl("https://localhost:5001/");
            _webDriver.Manage().Window.Size = new System.Drawing.Size(1920, 1040);
            _webDriver.FindElement(By.Id("email")).SendKeys("001231avaneszdes@gmail.com");
            _webDriver.FindElement(By.Id("password")).SendKeys("0031231qwe!@#QWE");
            _webDriver.FindElement(By.CssSelector("#signIn > .MuiButton-label")).Click();

            Thread.Sleep(1000);
            _webDriver.FindElement(By.XPath($"/html/body/div[1]/div/div/div[2]/div[1]/div/h1/form[{items}]/div/button[2]")).Click();
            Thread.Sleep(600);
            _webDriver.FindElement(By.XPath($"/html/body/div[{items + 1}]/div[3]/div/div[2]/div/div/input")).Click();
            Thread.Sleep(600);
            _webDriver.FindElement(By.XPath($"/html/body/div[{items + 1}]/div[3]/div/div[2]/div/div/input"))
                .SendKeys("12121003updated123777 item");
            Thread.Sleep(600);
            _webDriver.FindElement(By.XPath($"/html/body/div[{items + 1}]/div[3]/div/div[3]/button[1]")).Click();
            var expectedLastItemText = "12121003updated123777 item";

            Assert.IsTrue(lastItemText != expectedLastItemText);
        }
    }
}