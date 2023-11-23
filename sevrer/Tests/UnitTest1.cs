using Microsoft.AspNetCore.Mvc;
using server;
using Moq;
using System.Text;

namespace Tests;
public class AuthControllerTests
{
    private readonly Mock<UserRepository> _mockRepo;
    private readonly AuthController _controller;

    public AuthControllerTests()
    {
        _mockRepo = new Mock<UserRepository>();
        _controller = new AuthController(_mockRepo.Object);
    }

    [Fact]
    public async Task Login_UserDoesNotExist_ReturnsUserCreated()
    {
        // Arrange
        var loginDto = new LoginDto { Username = "testUser", Password = "password" };
        _mockRepo.Setup(repo => repo.GetUserByUsernameAsync(It.IsAny<string>())).ReturnsAsync((User)null);

        // Act
        var result = await _controller.Login(loginDto);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result);
        var returnValue = Assert.IsType<OkObjectResult>(okResult.Value);
        Assert.Equal(okResult, returnValue);
    }

    [Fact]
    public async Task Login_WrongPassword_ReturnsBadRequest()
    {
        // Arrange
        var loginDto = new LoginDto { Username = "Artem", Password = "wrongpassword" };
        var user = new User { Username = "testUser", Password = Convert.ToBase64String(Encoding.UTF8.GetBytes("password")) };
        _mockRepo.Setup(repo => repo.GetUserByUsernameAsync(It.IsAny<string>())).ReturnsAsync(user);

        // Act
        var result = await _controller.Login(loginDto);

        // Assert
        Assert.IsType<BadRequestObjectResult>(result);
    }


    [Fact]
    public async Task RecordTestResult_UserNotFound_ReturnsNotFound()
    {
        // Arrange
        _mockRepo.Setup(repo => repo.GetUserByUsernameAsync(It.IsAny<string>())).ReturnsAsync((User)null);

        // Act
        var result = await _controller.RecordTestResult("test1", 80, "asd");

        // Assert
        Assert.IsType<NotFoundObjectResult>(result);
    }

    [Fact]
    public async Task GetCompletedTests_UserNotFound_ReturnsNotFound()
    {
        // Arrange
        _mockRepo.Setup(repo => repo.GetUserByUsernameAsync(It.IsAny<string>())).ReturnsAsync((User)null);

        // Act
        var result = await _controller.GetCompletedTests("testUser");

        // Assert
        Assert.IsType<NotFoundObjectResult>(result);
    }




}

