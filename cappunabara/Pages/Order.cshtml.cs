using Microsoft.AspNetCore.Mvc.RazorPages;

namespace cappunabara.Pages
{
    public class OrderModel : PageModel
    {
        private readonly ILogger<OrderModel> _logger;

        public OrderModel(ILogger<OrderModel> logger)
        {
            _logger = logger;
        }

        public void OnGet()
        {
            // Initialize order page
        }
    }
}