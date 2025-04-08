from django.contrib import admin
from .models import Category, PortfolioItem, Testimonial
from tinymce.widgets import TinyMCE
from django.db import models

class PortfolioItemAdmin(admin.ModelAdmin):
    formfield_overrides = {
        models.TextField: {'widget': TinyMCE()},
    }
    list_display = ('title', 'github_url', 'category', 'created_at')
    list_filter = ('category',)
    search_fields = ('title', 'description')

class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)

class TestimonialAdmin(admin.ModelAdmin):
    list_display = ('name', 'title')
    search_fields = ('name', 'title')

admin.site.register(Category, CategoryAdmin)
admin.site.register(PortfolioItem, PortfolioItemAdmin)
admin.site.register(Testimonial, TestimonialAdmin)