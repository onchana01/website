from django.shortcuts import render
from .models import PortfolioItem, Category, Testimonial

def home(request):
    portfolio_items = PortfolioItem.objects.all()
    categories = Category.objects.all()
    testimonials = Testimonial.objects.all()
    return render(request, 'portfolio/index.html', {
        'portfolio_items': portfolio_items,
        'categories': categories,
        'testimonials': testimonials,
    })

# Optional other views (can be removed if not used)
def about(request):
    return render(request, 'portfolio/index.html')

def resume(request):
    return render(request, 'portfolio/index.html')

def portfolio(request):
    return render(request, 'portfolio/index.html')

def services(request):
    return render(request, 'portfolio/index.html')

def contact(request):
    return render(request, 'portfolio/index.html')

def thanks(request):
    return render(request, 'portfolio/thanks.html')