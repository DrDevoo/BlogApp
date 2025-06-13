using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;


[ApiController]
[Route("api/[controller]")]
public class PostsController : ControllerBase
{
    private readonly AppDbContext _context;

    public PostsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<BlogPost>>> GetPosts()
    {
        return await _context.BlogPosts.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<BlogPost>> GetPost(int id)
    {
        var post = await _context.BlogPosts.FindAsync(id);
        if (post == null) return NotFound();
        return post;
    }

    [HttpGet("author/{authorName}")]
    public async Task<ActionResult<IEnumerable<BlogPost>>> GetPostsByAuthor(string authorName)
    {
        var posts = await _context.BlogPosts
            .Where(p => p.Author == authorName)
            .ToListAsync();

        if (posts == null || posts.Count == 0)
            return NotFound();

        return Ok(posts);
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> CreatePost(BlogPost post)
    {
        post.DateCreated = DateTime.UtcNow;
        _context.BlogPosts.Add(post);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetPost), new { id = post.Id }, post);
    }

    [HttpPut("{id}")]
    [Authorize]
    public async Task<IActionResult> UpdatePost(int id, BlogPost post)
    {
        if (id != post.Id) return BadRequest();
        _context.Entry(post).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    [Authorize]
    public async Task<IActionResult> DeletePost(int id)
    {
        var post = await _context.BlogPosts.FindAsync(id);
        if (post == null) return NotFound();
        _context.BlogPosts.Remove(post);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
