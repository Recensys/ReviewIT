using System;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using BibliographyParserCore;
using BibliographyParserCore.BibTex;
using BibliographyParserCore.ItemValidators;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using RecensysCoreRepository.DTOs;
using RecensysCoreRepository.EFRepository;
using RecensysCoreRepository.Repositories;
using RecensysCoreBLL;
using RecensysCoreWebAPI.Utils;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace RecensysCoreWebAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class StudyController : Controller
    {
        private readonly IStudyDetailsRepository _deRepo;
        private readonly IStudySourceRepository _soRepo;
        private readonly IStageDetailsRepository _sdRepo;
        private readonly IStudyStartEngine _ssEngine;
        private readonly IStudyMemberRepository _studyMemberRepo;
        private readonly IOverviewRepository _overviewRepo;
        private readonly IBibliographyParser _bibliographyParser;
        private readonly IArticleRepository _articleRepo;

        public StudyController(IStudyDetailsRepository deRepo, IStudySourceRepository soRepo, IStageDetailsRepository sdRepo, IStudyStartEngine ssEngine, IStudyMemberRepository studyMemberRepo, IOverviewRepository overviewRepo, IBibliographyParser bibliographyParser, IArticleRepository articleRepo)
        {
            _deRepo = deRepo;
            _soRepo = soRepo;
            _sdRepo = sdRepo;
            _ssEngine = ssEngine;
            _studyMemberRepo = studyMemberRepo;
            _overviewRepo = overviewRepo;
            _bibliographyParser = bibliographyParser;
            _articleRepo = articleRepo;
        }

        [HttpGet("{id}/stages")]
        public IActionResult GetStages(int id)
        {
            try
            {
                using (_sdRepo)
                {
                    return Json(_sdRepo.GetAll(id));
                }
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            try
            {
                using (_deRepo)
                {
                    return Json(_deRepo.Read(id));
                }
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
        

        [HttpPut]
        public IActionResult Put([FromBody] StudyDetailsDTO dto)
        {
            try
            {
                using (_deRepo)
                {
                    return Json(_deRepo.Update(dto));
                }
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        /// <summary>
        /// Gets a list of basic details of studies
        /// </summary>
        /// <returns>Json array of study details</returns>
        [HttpGet("list")]
        public IActionResult GetList()
        {
            string sub;
            if (!User.Claims.TryGetSub(out sub)) return BadRequest("user could not be uniquely identified");

            try
            {
                using (_deRepo)
                {
                    return Json(_deRepo.GetAll(0).ToArray());
                }
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpPost]
        public IActionResult Post([FromBody] StudyDetailsDTO dto, [FromQuery]int uid)
        {
            if (!ModelState.IsValid) return BadRequest();

            try
            {
                using (_deRepo)
                using (_studyMemberRepo)
                {
                    var sid = _deRepo.Create(dto);
                    _studyMemberRepo.Update(sid, new StudyMemberDTO[] {new StudyMemberDTO {Id = uid, Role = ResearcherRole.ResearchManager} });
                    return Json(sid);
                }
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }


        [HttpDelete]
        [Route("{id}")]
        public IActionResult Delete(int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            try
            {
                using (_sdRepo)
                {
                    _deRepo.Delete(id);
                    return Ok();
                }
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
        

        [HttpPost]
        [Route("{id}/config/source")]
        public IActionResult Upload(int id, IFormFile file)
        {
            if (file == null) throw new Exception("File is null");
            if (file.Length == 0) throw new Exception("File is empty");

            int amountOfArticles;

            using (Stream stream = file.OpenReadStream())
            {
                using (var reader = new StreamReader(stream))
                {
                    var fileContent = reader.ReadToEnd();
                    var list = _bibliographyParser.Parse(fileContent);
                    amountOfArticles = list.Count;

                    using (_soRepo)
                    {
                        _soRepo.Post(id, list);
                    }
                }
            }
            return Ok(amountOfArticles);
        }

        [HttpGet("{id}/bib")]
        public FileStreamResult DownloadSource(int id)
        {
            using (_articleRepo)
            {
                var articles = _articleRepo.GetAllActive(id);

                var stream = _bibliographyParser.Export(articles);

                Response.Headers.Add("content-disposition", "attachment; filename=test.bib");
                return File(stream, "application/octet-stream");
            }
        }

        [HttpGet("{id}/start")]
        public IActionResult Start(int id)
        {

            try
            {
                var tasksCreated = _ssEngine.StartStudy(id);
                return Json(tasksCreated);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpGet("{id}/overview")]
        public async Task<IActionResult> Overview(int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            return Ok(await _overviewRepo.ReadAsync(id));
        }

    }
}
