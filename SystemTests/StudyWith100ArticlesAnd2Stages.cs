using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Reflection;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http.Internal;
using Microsoft.AspNetCore.TestHost;
using Moq;
using Newtonsoft.Json;
using RecensysCoreBLL;
using RecensysCoreRepository.DTOs;
using RecensysCoreRepository.EFRepository.Repositories;
using RecensysCoreRepository.Repositories;
using RecensysCoreWebAPI;
using RecensysCoreWebAPI.Controllers;
using Xunit;

namespace SystemTests
{

    public class TestFixture : IDisposable
    {

        public TestServer TestServer { get; set; }
        public HttpClient HttpClient { get; set; }
        public string StudyId { get; set; }
        public string StageId1 { get; set; }
        public string StageId2 { get; set; }
        public int UserId { get; set; }

        public TestFixture()
        {
            TestServer = new TestServer(new WebHostBuilder()
                .UseStartup<Startup>());
            HttpClient = TestServer.CreateClient();
            
        }

        public void Dispose()
        {
            TestServer.Dispose();
            HttpClient.Dispose();
        }
        
    }



    public class StudyWith100ArticlesAnd2Stages : IClassFixture<TestFixture>
    {
        private TestFixture _f;

        public StudyWith100ArticlesAnd2Stages(TestFixture fixture)
        {
            _f = fixture;
        }


        [Fact(DisplayName = "Go through a whole study with 100 articles and 2 phases")]
        public async Task TestRunner()
        {
            // setup study
            await Study_Post_Get();
            await Source_Post();
            await AddIsGSDField();
            await AddIsGSDCriteria();
            await AddIsANiceYearFieldd();
            await AddIsANiceYearCriteria();
            await AddUser();

            // setup first stage
            await AddStage();
            await StageFieldsStage1();
            await DistributionStage1();

            // setup second stage
            await AddStage2();
            await StageFieldsStage2();
            await DistributionStage2();

            // conduct study
            await StartStudy();
            await CompleteTasksForStage1();
            await CompleteTasksForStage2();
        }

        public async Task TestThrow()
        {
            Assert.False(true);
        }

        //[Fact(DisplayName = "Post new study")]
        public async Task Study_Post_Get()
        {
            var dto = new StudyDetailsDTO
            {
                Name = "Test Study"
            };

            // Act
            var response = await _f.HttpClient.PostAsync("api/study", new StringContent(JsonConvert.SerializeObject(dto),Encoding.UTF8,"application/json"));
            response.EnsureSuccessStatusCode();
            _f.StudyId = await response.Content.ReadAsStringAsync();

            var getResponse = await _f.HttpClient.GetStringAsync($"api/study/{_f.StudyId}");
            var resDto = JsonConvert.DeserializeObject<StudyDetailsDTO>(getResponse);

            // Assert
            Assert.Equal("Test Study", resDto.Name);
        }

        //[Fact(DisplayName = "Post bibtex with 100 articles returns 100")]
        public async Task Source_Post()
        {
            //var stream = new Byte("bibtex100.bib", FileMode.Open);
            var bibtex = File.ReadAllBytes("bibtex100.bib");
            var dataContent = new MultipartFormDataContent();
            var fileContent = new ByteArrayContent(bibtex);
            fileContent.Headers.ContentType = MediaTypeHeaderValue.Parse("application/octet-stream");
            dataContent.Add(fileContent, "file", "bibtex100.bib");

            // Act
            var response =
                await _f.HttpClient.PostAsync($"api/study/{_f.StudyId}/config/source", dataContent);
            

            response.EnsureSuccessStatusCode();
            var nrOfArticles = await response.Content.ReadAsStringAsync();
            
            // Assert
            Assert.Equal("100", nrOfArticles);
        }

        public async Task AddIsGSDField()
        {
            var response = await _f.HttpClient.GetStringAsync($"api/study/{_f.StudyId}/field");
            var responseDto = JsonConvert.DeserializeObject<FieldDTO[]>(response).ToList();

            Assert.Equal(13, responseDto.Count);
            var isGsdField = new FieldDTO
            {
                DataType = DataType.Boolean,
                Name = "IsGSD?"
            };
            responseDto.Add(isGsdField);

            var content = new StringContent(JsonConvert.SerializeObject(responseDto), Encoding.UTF8, "application/json");
            var response2 = await _f.HttpClient.PutAsync($"api/study/{_f.StudyId}/field", content);
            response2.EnsureSuccessStatusCode();

            var response3 = await _f.HttpClient.GetStringAsync($"api/study/{_f.StudyId}/field");
            var response3Dto = JsonConvert.DeserializeObject<FieldDTO[]>(response3);

            Assert.Equal(14, response3Dto.Length);
        }

        public async Task AddIsGSDCriteria()
        {
            // Search for isGSD field
            var response = await _f.HttpClient.GetStringAsync($"api/study/{_f.StudyId}/field/search?term=IsGSD?");
            var responseDto = JsonConvert.DeserializeObject<FieldDTO[]>(response);
            var isGSDField = responseDto.Single(dto => dto.Name == "IsGSD?");

            var response2 = await _f.HttpClient.GetStringAsync($"api/study/{_f.StudyId}/criteria");
            var response2Dto = JsonConvert.DeserializeObject<CriteriaDTO>(response2);

            Assert.Equal(0, response2Dto.Inclusions.Count);
            Assert.Equal(0, response2Dto.Exclusions.Count);
            var isGsdField = new FieldCriteriaDTO
            {
                Field = isGSDField,
                Operator = "==",
                Value = "false"
            };
            response2Dto.Exclusions.Add(isGsdField);

            var content = new StringContent(JsonConvert.SerializeObject(response2Dto), Encoding.UTF8, "application/json");
            var response3 = await _f.HttpClient.PutAsync($"api/study/{_f.StudyId}/criteria", content);
            response3.EnsureSuccessStatusCode();

            var response4 = await _f.HttpClient.GetStringAsync($"api/study/{_f.StudyId}/criteria");
            var response4Dto = JsonConvert.DeserializeObject<CriteriaDTO>(response4);

            Assert.Equal(1, response4Dto.Exclusions.Count);
            Assert.Equal(0, response4Dto.Inclusions.Count);
        }

        public async Task AddIsANiceYearFieldd()
        {
            var response = await _f.HttpClient.GetStringAsync($"api/study/{_f.StudyId}/field");
            var responseDto = JsonConvert.DeserializeObject<FieldDTO[]>(response).ToList();

            Assert.Equal(14, responseDto.Count);
            var niceYearField = new FieldDTO
            {
                DataType = DataType.Boolean,
                Name = "Is a nice year?"
            };
            responseDto.Add(niceYearField);

            var content = new StringContent(JsonConvert.SerializeObject(responseDto), Encoding.UTF8, "application/json");
            var response2 = await _f.HttpClient.PutAsync($"api/study/{_f.StudyId}/field", content);
            response2.EnsureSuccessStatusCode();

            var response3 = await _f.HttpClient.GetStringAsync($"api/study/{_f.StudyId}/field");
            var response3Dto = JsonConvert.DeserializeObject<FieldDTO[]>(response3);

            Assert.Equal(15, response3Dto.Length);
        }

        public async Task AddIsANiceYearCriteria()
        {
            // Search for isGSD field
            var response = await _f.HttpClient.GetStringAsync($"api/study/{_f.StudyId}/field/search?term=Is a nice year?");
            var responseDto = JsonConvert.DeserializeObject<FieldDTO[]>(response);
            var niceYearField = responseDto.Single(dto => dto.Name == "Is a nice year?");

            var response2 = await _f.HttpClient.GetStringAsync($"api/study/{_f.StudyId}/criteria");
            var response2Dto = JsonConvert.DeserializeObject<CriteriaDTO>(response2);

            Assert.Equal(0, response2Dto.Inclusions.Count);
            Assert.Equal(1, response2Dto.Exclusions.Count);
            var isGsdField = new FieldCriteriaDTO
            {
                Field = niceYearField,
                Operator = "==",
                Value = "true"
            };
            response2Dto.Inclusions.Add(isGsdField);

            var content = new StringContent(JsonConvert.SerializeObject(response2Dto), Encoding.UTF8, "application/json");
            var response3 = await _f.HttpClient.PutAsync($"api/study/{_f.StudyId}/criteria", content);
            response3.EnsureSuccessStatusCode();

            var response4 = await _f.HttpClient.GetStringAsync($"api/study/{_f.StudyId}/criteria");
            var response4Dto = JsonConvert.DeserializeObject<CriteriaDTO>(response4);

            Assert.Equal(1, response4Dto.Exclusions.Count);
            Assert.Equal(1, response4Dto.Inclusions.Count);
        }

        //[Fact(DisplayName = "Add a user to the study")]
        public async Task AddUser()
        {
            var dto = new List<StudyMemberDTO>
            {
                new StudyMemberDTO
                {
                    Id = 1,
                }
            };
            var content = new StringContent(JsonConvert.SerializeObject(dto), Encoding.UTF8, "application/json");

            var response = await _f.HttpClient.PutAsync($"api/study/{_f.StudyId}/studymember", content);
            response.EnsureSuccessStatusCode();

            var response2 = await _f.HttpClient.GetStringAsync($"api/study/{_f.StudyId}/studymember");

            var resDto = JsonConvert.DeserializeObject<StudyMemberDTO[]>(response2);
            Assert.Equal(1, resDto.Length);
        }

        //[Fact(DisplayName = "Add a stage to the study and verify the name")]
        public async Task AddStage()
        {
            var dto = new StageDetailsDTO
            {
                Name = "Test Stage"
            };
            var content = new StringContent(JsonConvert.SerializeObject(dto), Encoding.UTF8, "application/json");
            var response = await _f.HttpClient.PostAsync($"api/study/{_f.StudyId}/stage", content);
            response.EnsureSuccessStatusCode();
            _f.StageId1 = await response.Content.ReadAsStringAsync();

            var response2 = await _f.HttpClient.GetStringAsync($"api/stage/{_f.StageId1}");

            var response2Dto = JsonConvert.DeserializeObject<StageDetailsDTO>(response2);
            Assert.Equal("Test Stage", response2Dto.Name);
        }

        public async Task AddStage2()
        {
            var dto = new StageDetailsDTO
            {
                Name = "Test Stage 2"
            };
            var content = new StringContent(JsonConvert.SerializeObject(dto), Encoding.UTF8, "application/json");
            var response = await _f.HttpClient.PostAsync($"api/study/{_f.StudyId}/stage", content);
            response.EnsureSuccessStatusCode();
            _f.StageId2 = await response.Content.ReadAsStringAsync();

            var response2 = await _f.HttpClient.GetStringAsync($"api/stage/{_f.StageId2}");

            var response2Dto = JsonConvert.DeserializeObject<StageDetailsDTO>(response2);
            Assert.Equal("Test Stage 2", response2Dto.Name);
        }

        public async Task StageFieldsStage1()
        {
            var response = await _f.HttpClient.GetStringAsync($"api/stage/{_f.StageId1}/stagefield");
            var responseDto = JsonConvert.DeserializeObject<StageFieldsDTO>(response);

            Assert.Equal(14, responseDto.AvailableFields.Count);

            var titleField = responseDto.AvailableFields.Single(f => f.Name == "Title");
            responseDto.AvailableFields.Remove(titleField);
            responseDto.VisibleFields.Add(titleField);
            var isGsdField = responseDto.AvailableFields.Single(f => f.Name == "IsGSD?");
            responseDto.AvailableFields.Remove(isGsdField);
            responseDto.RequestedFields.Add(isGsdField);

            var content = new StringContent(JsonConvert.SerializeObject(responseDto), Encoding.UTF8, "application/json");
            var response2 = await _f.HttpClient.PutAsync($"api/stage/{_f.StageId1}/stagefield", content);
            response2.EnsureSuccessStatusCode();

            var response3 = await _f.HttpClient.GetStringAsync($"api/stage/{_f.StageId1}/stagefield");
            var response3Dto = JsonConvert.DeserializeObject<StageFieldsDTO>(response3);

            Assert.Equal(13, response3Dto.AvailableFields.Count);
            Assert.Equal(1, response3Dto.VisibleFields.Count);
            Assert.Equal(1, response3Dto.RequestedFields.Count);
        }


        public async Task DistributionStage1()
        {
            var response = await _f.HttpClient.GetStringAsync($"api/stage/{_f.StageId1}/distribution");
            var responseDto = JsonConvert.DeserializeObject<DistributionDTO>(response);

            responseDto.Dist = new List<UserWorkDTO>
            {
                new UserWorkDTO
                {
                    Id = 1,
                    Range = new double[] {0,100}
                },
            };
            var content = new StringContent(JsonConvert.SerializeObject(responseDto), Encoding.UTF8, "application/json");
            var response2 = await _f.HttpClient.PutAsync($"api/stage/{_f.StageId1}/distribution", content);
            response2.EnsureSuccessStatusCode();

            var response3 = await _f.HttpClient.GetStringAsync($"api/stage/{_f.StageId1}/distribution");
            var response3Dto = JsonConvert.DeserializeObject<DistributionDTO>(response3);

            Assert.Equal(0, response3Dto.Dist.Single(d => d.Id == 1).Range[0]);
            Assert.Equal(100, response3Dto.Dist.Single(d => d.Id == 1).Range[1]);
        }

        public async Task StageFieldsStage2()
        {
            var response = await _f.HttpClient.GetStringAsync($"api/stage/{_f.StageId2}/stagefield");
            var responseDto = JsonConvert.DeserializeObject<StageFieldsDTO>(response);

            Assert.Equal(14, responseDto.AvailableFields.Count);

            var yearField = responseDto.AvailableFields.Single(f => f.Name == "Year");
            responseDto.AvailableFields.Remove(yearField);
            responseDto.VisibleFields.Add(yearField);
            var isNiceYearField = responseDto.AvailableFields.Single(f => f.Name == "Is a nice year?");
            responseDto.AvailableFields.Remove(isNiceYearField);
            responseDto.RequestedFields.Add(isNiceYearField);

            var content = new StringContent(JsonConvert.SerializeObject(responseDto), Encoding.UTF8, "application/json");
            var response2 = await _f.HttpClient.PutAsync($"api/stage/{_f.StageId2}/stagefield", content);
            response2.EnsureSuccessStatusCode();

            var response3 = await _f.HttpClient.GetStringAsync($"api/stage/{_f.StageId2}/stagefield");
            var response3Dto = JsonConvert.DeserializeObject<StageFieldsDTO>(response3);

            Assert.Equal(13, response3Dto.AvailableFields.Count);
            Assert.Equal(1, response3Dto.VisibleFields.Count);
            Assert.Equal(1, response3Dto.RequestedFields.Count);
        }

        public async Task DistributionStage2()
        {
            var response = await _f.HttpClient.GetStringAsync($"api/stage/{_f.StageId2}/distribution");
            var responseDto = JsonConvert.DeserializeObject<DistributionDTO>(response);

            responseDto.Dist = new List<UserWorkDTO>
            {
                new UserWorkDTO
                {
                    Id = 1,
                    Range = new double[] {0,100}
                },
            };
            var content = new StringContent(JsonConvert.SerializeObject(responseDto), Encoding.UTF8, "application/json");
            var response2 = await _f.HttpClient.PutAsync($"api/stage/{_f.StageId2}/distribution", content);
            response2.EnsureSuccessStatusCode();

            var response3 = await _f.HttpClient.GetStringAsync($"api/stage/{_f.StageId2}/distribution");
            var response3Dto = JsonConvert.DeserializeObject<DistributionDTO>(response3);

            Assert.Equal(0, response3Dto.Dist.Single(d => d.Id == 1).Range[0]);
            Assert.Equal(100, response3Dto.Dist.Single(d => d.Id == 1).Range[1]);
        }

        public async Task StartStudy()
        {
            var response = await _f.HttpClient.GetStringAsync($"api/study/{_f.StudyId}/start");
            
            Assert.Equal("100", response);
        }

        public async Task CompleteTasksForStage1()
        {
            var response = await _f.HttpClient.GetStringAsync($"api/tasks?sid={_f.StageId1}&uid=1");
            var dto = JsonConvert.DeserializeObject<ReviewTaskListDTO>(response);

            Assert.Equal(100, dto.Tasks.Count);

            for (int i = 0; i < dto.Tasks.Count; i++)
            {
                var reviewTask = dto.Tasks.ElementAt(i);
                reviewTask.TaskState = TaskState.Done;

                // set half half between true and false
                reviewTask.Data.ElementAt(1).Value = i % 2 == 0 ? "false" : "true";

                var content = new StringContent(JsonConvert.SerializeObject(reviewTask), Encoding.UTF8, "application/json");
                var response2 = await _f.HttpClient.PutAsync($"api/tasks", content);
                response2.EnsureSuccessStatusCode();
            }

            // check that there are no tasks left
            var response3 = await _f.HttpClient.GetStringAsync($"api/tasks?sid={_f.StageId1}&uid=1");
            var dto3 = JsonConvert.DeserializeObject<ReviewTaskListDTO>(response3);
            Assert.Equal(0, dto3.Tasks.Count);
        }

        public async Task CompleteTasksForStage2()
        {
            var response = await _f.HttpClient.GetStringAsync($"api/tasks?sid={_f.StageId2}&uid=1");
            var dto = JsonConvert.DeserializeObject<ReviewTaskListDTO>(response);

            Assert.Equal(50, dto.Tasks.Count);

            for (int i = 0; i < dto.Tasks.Count; i++)
            {
                var reviewTask = dto.Tasks.ElementAt(i);
                reviewTask.TaskState = TaskState.Done;

                // set half half between true and false
                reviewTask.Data.ElementAt(1).Value = i % 2 == 0 ? "false" : "true";

                var content = new StringContent(JsonConvert.SerializeObject(reviewTask), Encoding.UTF8, "application/json");
                var response2 = await _f.HttpClient.PutAsync($"api/tasks", content);
                response2.EnsureSuccessStatusCode();
            }

            // check that there are no tasks left
            var response3 = await _f.HttpClient.GetStringAsync($"api/tasks?sid={_f.StageId2}&uid=1");
            var dto3 = JsonConvert.DeserializeObject<ReviewTaskListDTO>(response3);
            Assert.Equal(0, dto3.Tasks.Count);
        }

    }
}
