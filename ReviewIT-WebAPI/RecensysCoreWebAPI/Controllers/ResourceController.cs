using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using BibliographyParserCore.BibTex;
using BibliographyParserCore.ItemValidators;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RecensysCoreRepository.Repositories;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace RecensysCoreWebAPI.Controllers
{
    [Route("api/[controller]")]
    public class ResourceController : Controller
    {

        private readonly IResourceRepository _resourceRepo;

        public ResourceController(IResourceRepository resourceRepo)
        {
            _resourceRepo = resourceRepo;
        }

        //[HttpPost]
        //[Route("{id}/config/source")]
        //public IActionResult Upload(int id, IFormFile file)
        //{
        //    if (file == null) throw new Exception("File is null");
        //    if (file.Length == 0) throw new Exception("File is empty");

        //    int amountOfArticles;

        //    using (Stream stream = file.OpenReadStream())
        //    {
        //        using (var reader = new StreamReader(stream))
        //        {
        //            var fileContent = reader.ReadToEnd();
        //            var list = new BibTexParser(new ItemValidator()).Parse(fileContent);
        //            amountOfArticles = list.Count;

        //            using (_soRepo)
        //            {
        //                _soRepo.Post(id, list);
        //            }
        //        }
        //    }
        //    return Ok(amountOfArticles);
        //}

        /// <summary>
        ///     
        /// </summary>
        /// <param name="id">resource field id</param>
        /// <param name="file">file stream</param>
        /// <returns>name of the created resource blob</returns>
        [HttpPost]
        [Route("{id}/upload")]
        public IActionResult Upload(int id, IFormFile file)
        {
            if (!ModelState.IsValid || file == null) return BadRequest(ModelState);

            using (_resourceRepo)
            {
                var ext = Path.GetExtension(file.FileName);
                var name = _resourceRepo.Update(id, ext, file.ContentType, file.OpenReadStream());
                return Ok(name);
            }
        }
        

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {

        }
    }
}
