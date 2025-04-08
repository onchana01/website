from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=50, unique=True)

    class Meta:
        verbose_name = "Category"
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name

class PortfolioItem(models.Model):
    title = models.CharField(max_length=100)
    github_url = models.URLField(max_length=200, unique=True, help_text="URL to the GitHub repository (e.g., 'https://github.com/username/repo')")
    description = models.TextField()
    image = models.ImageField(upload_to='portfolio/images/',null=True, blank=True, help_text="Image preview of the project")
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='portfolio_items')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Portfolio Item"
        verbose_name_plural = "Portfolio Items"

    def __str__(self):
        return self.title

class Testimonial(models.Model):
    name = models.CharField(max_length=100)
    title = models.CharField(max_length=100, help_text="e.g., CEO of Helpful Engineering")
    image = models.ImageField(upload_to='testimonials/images/', help_text="Image of the person giving the testimonial")
    quote = models.TextField(blank=True, help_text="Optional testimonial quote")

    class Meta:
        verbose_name = "Testimonial"
        verbose_name_plural = "Testimonials"

    def __str__(self):
        return self.name