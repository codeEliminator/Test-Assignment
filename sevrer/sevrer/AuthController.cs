using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using sevrer;
using System.Threading.Tasks;

namespace server
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly UserRepository _userRepository;
        private string message = "User exising";

        public AuthController(UserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            var user = await _userRepository.GetUserByUsernameAsync(loginDto.Username);

            if (user == null)
            {
                user = new User { Username = loginDto.Username, Password = Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes(loginDto.Password)), TestResults = new Dictionary<string, TestResult>() };
                await _userRepository.CreateUserAsync(user);
                message = "User Created";
            }
            else if (System.Text.Encoding.UTF8.GetString(System.Convert.FromBase64String(user.Password)) != loginDto.Password)
            {
                message = "Wrong password.";
                return BadRequest("Wrong password.");
            }

            return Ok(new { Username = user.Username, message = message });
        }

        [HttpPost("recordTestResult")]
        public async Task<IActionResult> RecordTestResult(string testId, int score, string username)
        {
            var user = await _userRepository.GetUserByUsernameAsync(username);
            if (user == null)
            {
                return NotFound("User not found.");
            }

            if (user.TestResults == null)
            {
                user.TestResults = new Dictionary<string, TestResult>();
            }

            user.TestResults[testId] = new TestResult { IsCompleted = true, Score = score };
            await _userRepository.UpdateUserAsync(user);

            return Ok();
        }

        [HttpGet("getCompletedTests")]
        public async Task<IActionResult> GetCompletedTests([FromQuery] string username)
        {
            var user = await _userRepository.GetUserByUsernameAsync(username);
            if (user == null)
            {
                return NotFound("User not found.");
            }

            return Ok(user.TestResults);
        }

    }
}
