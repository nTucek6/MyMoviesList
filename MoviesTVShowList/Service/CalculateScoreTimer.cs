using Services.MoviesAdmin;


namespace MyMoviesList.Service
{
    public class CalculateScoreTimer : IHostedService, IDisposable
    {
        private readonly ILogger<CalculateScoreTimer> _logger;
        private Timer _timer;
        private readonly IServiceProvider _serviceProvider;


        public CalculateScoreTimer(ILogger<CalculateScoreTimer> logger, IServiceProvider serviceProvider)
        {
            _logger = logger;
            _serviceProvider = serviceProvider;
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            _logger.LogInformation("TimerService is starting.");

            var now = DateTime.Now;
            var desiredTimeUtc1 = new DateTime(now.Year, now.Month, now.Day, 08, 0, 0, DateTimeKind.Local);
            var desiredTimeUtc2 = new DateTime(now.Year, now.Month, now.Day, 20, 0, 0, DateTimeKind.Local);

            if (desiredTimeUtc1 <= now)
            {
                desiredTimeUtc1 = desiredTimeUtc1.AddDays(1);
            }

            if (desiredTimeUtc2 <= now)
            {
                desiredTimeUtc2 = desiredTimeUtc2.AddDays(1);
            }

            var initialDelay1 = desiredTimeUtc1 - now;
            var initialDelay2 = desiredTimeUtc2 - now;

            _timer = new Timer(async state => await DoWorkAsync(state), null, initialDelay1, TimeSpan.FromDays(1));

            // Schedule the second execution for the same day, after the initial delay
            _timer = new Timer(async state => await DoWorkAsync(state), null, initialDelay2, TimeSpan.FromDays(1));

            return Task.CompletedTask;
        }

        private async Task DoWorkAsync(object state)
        {
            _logger.LogInformation("TimerService is working at specific time.");
            // Perform your asynchronous background task here
            
            using var scope = _serviceProvider.CreateScope();
            var mySingletonService = scope.ServiceProvider.GetRequiredService<IMoviesAdminService>();

            await mySingletonService.UpdateMoviesScore();

        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            _logger.LogInformation("TimerService is stopping.");

            _timer?.Change(Timeout.Infinite, 0);

            return Task.CompletedTask;
        }

        public void Dispose()
        {
            _timer?.Dispose();
        }
    }
}


   