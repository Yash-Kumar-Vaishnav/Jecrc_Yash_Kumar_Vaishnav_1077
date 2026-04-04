using BillGeneratorSystem.Data;
using BillGeneratorSystem.Models;
using Microsoft.EntityFrameworkCore;

namespace BillGeneratorSystem.Services;

public interface ICatalogService
{
    Task<List<CatalogItem>> GetAllCatalogItemsAsync();
    Task<List<CatalogItem>> GetCatalogByTypeAsync(string catalogType);
    Task<CatalogItem?> GetCatalogItemByIdAsync(int id);
    Task<CatalogItem> CreateCatalogItemAsync(CatalogItem item);
    Task<CatalogItem> UpdateCatalogItemAsync(int id, CatalogItem item);
    Task<bool> DeleteCatalogItemAsync(int id);
    Task<List<CatalogItem>> SearchCatalogAsync(string searchTerm);
}

public class CatalogService : ICatalogService
{
    private readonly BillGeneratorDbContext _context;

    public CatalogService(BillGeneratorDbContext context)
    {
        _context = context;
    }

    public async Task<List<CatalogItem>> GetAllCatalogItemsAsync()
    {
        return await _context.CatalogItems
            .Where(c => c.IsActive)
            .OrderBy(c => c.CatalogType)
            .ThenBy(c => c.Name)
            .ToListAsync();
    }

    public async Task<List<CatalogItem>> GetCatalogByTypeAsync(string catalogType)
    {
        return await _context.CatalogItems
            .Where(c => c.CatalogType == catalogType && c.IsActive)
            .OrderBy(c => c.Name)
            .ToListAsync();
    }

    public async Task<CatalogItem?> GetCatalogItemByIdAsync(int id)
    {
        return await _context.CatalogItems.FindAsync(id);
    }

    public async Task<CatalogItem> CreateCatalogItemAsync(CatalogItem item)
    {
        item.CreatedAt = DateTime.UtcNow;
        item.UpdatedAt = DateTime.UtcNow;
        _context.CatalogItems.Add(item);
        await _context.SaveChangesAsync();
        return item;
    }

    public async Task<CatalogItem> UpdateCatalogItemAsync(int id, CatalogItem item)
    {
        var existingItem = await _context.CatalogItems.FindAsync(id);
        if (existingItem == null)
            throw new InvalidOperationException("Catalog item not found");

        existingItem.Name = item.Name;
        existingItem.Description = item.Description;
        existingItem.Price = item.Price;
        existingItem.IsActive = item.IsActive;
        existingItem.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();
        return existingItem;
    }

    public async Task<bool> DeleteCatalogItemAsync(int id)
    {
        var item = await _context.CatalogItems.FindAsync(id);
        if (item == null)
            return false;

        item.IsActive = false;
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<List<CatalogItem>> SearchCatalogAsync(string searchTerm)
    {
        return await _context.CatalogItems
            .Where(c => c.IsActive && 
                   (c.Name.Contains(searchTerm) || c.Description.Contains(searchTerm)))
            .ToListAsync();
    }
}
