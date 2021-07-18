using System.Collections.Generic;
using System.Threading;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using NUnit.Framework;

namespace NUnitAutoTests
{
    [TestFixture]
    public class SignInSignUpTest
    {
        private IWebDriver _webDriver;
        [SetUp]
        public void SetUp()
        {
            var service =
                ChromeDriverService.CreateDefaultService(@"C:\Users\Vladislav Avanesov\Downloads\chromedriver_win32");
            service.HideCommandPromptWindow = true;
            _webDriver = new ChromeDriver(service);
        }
        [TearDown]
        protected void TearDown()
        {
            _webDriver.Quit();
        }
        
        [Test]
        public void SignUp()
        {
            _webDriver.Navigate().GoToUrl("https://localhost:5001/signUp");
            _webDriver.Manage().Window.Size = new System.Drawing.Size(1243, 1040);
            Thread.Sleep(3000);
            _webDriver.FindElement(By.Id("firstName")).SendKeys("Avanesov");
            _webDriver.FindElement(By.Id("lastName")).SendKeys("Vladislav");
            _webDriver.FindElement(By.Id("email")).SendKeys("1001231avaneszdes@gmail.com");
            _webDriver.FindElement(By.Id("password")).SendKeys("10031231qwe!@#QWE");
            _webDriver.FindElement(By.Id("confirmPassword")).SendKeys("10031231qwe!@#QWE");
            
            Assert.That(_webDriver.FindElement(By.Id("email")).Text, Is.Not.EqualTo("szdes@gmail.com"));
            Assert.That(_webDriver.FindElement(By.Id("password")).Text, Is.Not.EqualTo("we!@#QWE"));
            Assert.That(_webDriver.FindElement(By.Id("lastName")).Text, Is.Not.EqualTo("Vla"));
            Assert.That(_webDriver.FindElement(By.Id("firstName")).Text, Is.Not.EqualTo("Ava"));
            _webDriver.FindElement(By.CssSelector(".MuiButton-label")).Click();
            
            Thread.Sleep(500);
            var currentUrl = _webDriver.Url;
            Assert.IsTrue(currentUrl == "https://localhost:5001/");
        }
        
        [Test]
        public void SignIn()
        {
            _webDriver.Navigate().GoToUrl("https://localhost:5001");
            _webDriver.Manage().Window.Size = new System.Drawing.Size(1243, 1040);
            _webDriver.FindElement(By.Id("email")).SendKeys("001231avaneszdes@gmail.com");
            _webDriver.FindElement(By.Id("password")).SendKeys("0031231qwe!@#QWE");
            
            {
                string value = _webDriver.FindElement(By.Id("email")).GetAttribute("value");
                Assert.That(value, Is.EqualTo("001231avaneszdes@gmail.com"));
            }
            {
                string value = _webDriver.FindElement(By.Id("password")).GetAttribute("value");
                Assert.That(value, Is.EqualTo("0031231qwe!@#QWE"));
            }
            _webDriver.FindElement(By.CssSelector(".MuiButton-contained > .MuiButton-label")).Click();
            
            Thread.Sleep(500);
            var currentUrl = _webDriver.Url;
            
            Assert.IsTrue(currentUrl == "https://localhost:5001/todoList");
            
        }
        
       
    }
}
