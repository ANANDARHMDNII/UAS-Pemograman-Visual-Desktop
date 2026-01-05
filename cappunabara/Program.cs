var builder = WebApplication.CreateBuilder(args);

// Configure Kestrel to use specific port
builder.WebHost.UseUrls("http://localhost:5140");

// Add services to the container.
builder.Services.AddRazorPages();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseStaticFiles();
app.UseRouting();
app.UseAuthorization();
app.MapRazorPages();

// Add routing for login system
app.MapGet("/", () => Results.Redirect("/index.html"));
app.MapGet("/login", () => Results.Redirect("/modern-login.html"));
app.MapGet("/dashboard", () => Results.Redirect("/modern-dashboard.html"));
app.MapGet("/profile", () => Results.Redirect("/profile.html"));

app.Run();
