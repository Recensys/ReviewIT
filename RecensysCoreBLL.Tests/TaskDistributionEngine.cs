using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Moq;
using RecensysCoreRepository.DTOs;
using RecensysCoreRepository.Repositories;
using Xunit;

namespace RecensysCoreBLL.Tests
{
    public class TaskDistributionEngine
    {

        [Fact]
        public void Generate_two_articles__returns_2()
        {
            var distMock = new Mock<IDistributionRepository>();
            distMock.Setup(d => d.Read(1)).Returns(new DistributionDTO()
            {
                Dist = new List<UserWorkDTO>
                {
                    new UserWorkDTO {Id = 1, Range = new []{0.0,100.0}}
                }
            });
            var dataMock = new Mock<IArticleRepository>();
            dataMock.Setup(d => d.GetAllWithRequestedFields(1)).Returns(new List<ArticleWithRequestedFieldsDTO>
            {
                new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
                new ArticleWithRequestedFieldsDTO {ArticleId = 2, FieldIds = new [] {2}}
            });
            var taskMock = new Mock<ITaskConfigRepository>();
            
            var engine = new RecensysCoreBLL.TaskDistributionEngine(distMock.Object, taskMock.Object, dataMock.Object);
            var r = engine.Generate(1);

            Assert.Equal(r, 2);
        }

        [Fact]
        public void Generate_two_articles__two_tasks_created()
        {
            var distMock = new Mock<IDistributionRepository>();
            distMock.Setup(d => d.Read(1)).Returns(new DistributionDTO()
            {
                Dist = new List<UserWorkDTO>
                {
                    new UserWorkDTO {Id = 1, Range = new []{0.0,100.0}}
                }
            });
            var dataMock = new Mock<IArticleRepository>();
            dataMock.Setup(d => d.GetAllWithRequestedFields(1)).Returns(new List<ArticleWithRequestedFieldsDTO>
            {
                new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
                new ArticleWithRequestedFieldsDTO {ArticleId = 2, FieldIds = new [] {2}}
            });
            var taskMock = new Mock<ITaskConfigRepository>();


            var engine = new RecensysCoreBLL.TaskDistributionEngine(distMock.Object, taskMock.Object, dataMock.Object);
            var r = engine.Generate(1);

            taskMock.Verify(t => t.Create(It.IsAny<int>(), It.IsAny<int>(), It.IsAny<int>(), It.IsAny<int[]>()), Times.Exactly(2));
        }


        [Fact]
        public void Generate_two_articles_100_percent_mathias__two_tasks_for_mathias()
        {
            var distMock = new Mock<IDistributionRepository>();
            distMock.Setup(d => d.Read(1)).Returns(new DistributionDTO()
            {
                Dist = new List<UserWorkDTO>
                {
                    new UserWorkDTO {Id = 1, Range = new []{0.0,100.0}}
                }
            });
            var dataMock = new Mock<IArticleRepository>();
            dataMock.Setup(d => d.GetAllWithRequestedFields(1)).Returns(new List<ArticleWithRequestedFieldsDTO>
            {
                new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
                new ArticleWithRequestedFieldsDTO {ArticleId = 2, FieldIds = new [] {2}}
            });
            var taskMock = new Mock<ITaskConfigRepository>();


            var engine = new RecensysCoreBLL.TaskDistributionEngine(distMock.Object, taskMock.Object, dataMock.Object);
            var r = engine.Generate(1);

            taskMock.Verify(t => t.Create(It.IsAny<int>(), It.IsAny<int>(), It.IsAny<int>(), It.IsAny<int[]>()), Times.Exactly(2));
        }

    //    [Fact]
    //    public void Generate_two_articles_50_50_between_mathias_and_paolo__one_task_for_each()
    //    {
    //        var distMock = new Mock<IDistributionRepository>();
    //        distMock.Setup(d => d.Read(1)).Returns(new DistributionDTO()
    //        {
    //            Dist = new List<UserWorkDTO>
    //            {
    //                new UserWorkDTO {Id = 1, Range = new []{0.0,50.0}},
    //                new UserWorkDTO {Id = 2, Range = new []{50.0,100.0}},
    //            }
    //        });
    //        var dataMock = new Mock<IRequestedFieldsRepository>();
    //        dataMock.Setup(d => d.GetAll(1)).Returns(new List<ArticleWithRequestedFieldsDTO>
    //        {
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 2, FieldIds = new [] {2}}
    //        });
    //        var taskMock = new Mock<ITaskConfigRepository>();


    //        var engine = new RecensysCoreBLL.TaskDistributionEngine(distMock.Object, dataMock.Object, taskMock.Object);
    //        var r = engine.Generate(1);

    //        taskMock.Verify(t => t.Create(It.IsAny<int>(), It.IsAny<int>(), It.IsAny<int>(), It.IsAny<int[]>()), Times.Exactly(1));
    //        taskMock.Verify(t => t.Create(It.IsAny<int>(), It.IsAny<int>(), It.IsAny<int>(), It.IsAny<int[]>()), Times.Exactly(1));
    //    }

    //    [Fact]
    //    public void Generate_three_articles_33_33_33_between_mathias_paolo_and_jacob__one_task_for_each()
    //    {
    //        var distMock = new Mock<IDistributionRepository>();
    //        distMock.Setup(d => d.Read(1)).Returns(new DistributionDTO()
    //        {
    //            Dist = new List<UserWorkDTO>
    //            {
    //                new UserWorkDTO {Id = 1, Range = new []{0.0, 33.0}},
    //                new UserWorkDTO {Id = 2, Range = new []{33.0, 66.0}},
    //                new UserWorkDTO {Id = 3, Range = new []{66.0, 100.0}},
    //            }
    //        });
    //        var dataMock = new Mock<IRequestedFieldsRepository>();
    //        dataMock.Setup(d => d.GetAll(1)).Returns(new List<ArticleWithRequestedFieldsDTO>
    //        {
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 3, FieldIds = new [] {3}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 2, FieldIds = new [] {2}}
    //        });
    //        var taskMock = new Mock<ITaskConfigRepository>();


    //        var engine = new RecensysCoreBLL.TaskDistributionEngine(distMock.Object, dataMock.Object, taskMock.Object);
    //        var r = engine.Generate(1);

    //        taskMock.Verify(t => t.Create(It.IsAny<int>(), It.IsAny<int>(), It.IsAny<int>(), It.IsAny<int[]>()), Times.Exactly(1));
    //        taskMock.Verify(t => t.Create(It.IsAny<int>(), It.IsAny<int>(), It.IsAny<int>(), It.IsAny<int[]>()), Times.Exactly(1));
    //        taskMock.Verify(t => t.Create(It.IsAny<int>(), It.IsAny<int>(), It.IsAny<int>(), It.IsAny<int[]>()), Times.Exactly(1));
    //    }

    //    [Fact]
    //    public void Generate_2articles_fullOverlap__2forEach()
    //    {
    //        var distMock = new Mock<IDistributionRepository>();
    //        distMock.Setup(d => d.Read(1)).Returns(new DistributionDTO()
    //        {
    //            Dist = new List<UserWorkDTO>
    //            {
    //                new UserWorkDTO {Id = 1, Range = new []{0.0, 100.0}},
    //                new UserWorkDTO {Id = 2, Range = new []{0.0, 100.0}}
    //            }
    //        });
    //        var dataMock = new Mock<IRequestedFieldsRepository>();
    //        dataMock.Setup(d => d.GetAll(1)).Returns(new List<ArticleWithRequestedFieldsDTO>
    //        {
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 2, FieldIds = new [] {3}},
    //        });
    //        var taskMock = new Mock<ITaskConfigRepository>();


    //        var engine = new RecensysCoreBLL.TaskDistributionEngine(distMock.Object, dataMock.Object, taskMock.Object);
    //        var r = engine.Generate(1);

    //        taskMock.Verify(t => t.Create(It.IsAny<int>(), It.IsAny<int>(), It.IsAny<int>(), It.IsAny<int[]>()), Times.Exactly(2));
    //        taskMock.Verify(t => t.Create(It.IsAny<int>(), It.IsAny<int>(), It.IsAny<int>(), It.IsAny<int[]>()), Times.Exactly(2));
    //    }


    //    [Fact]
    //    public void Generate_moreArticlesThanUsers__CorrectlyDivided()
    //    {
    //        var distMock = new Mock<IDistributionRepository>();
    //        distMock.Setup(d => d.Read(1)).Returns(new DistributionDTO()
    //        {
    //            Dist = new List<UserWorkDTO>
    //            {
    //                new UserWorkDTO {Id = 1, Range = new []{0.0, 50.0}},
    //                new UserWorkDTO {Id = 2, Range = new []{50.0, 100.0}}
    //            }
    //        });
    //        var dataMock = new Mock<IRequestedFieldsRepository>();
    //        dataMock.Setup(d => d.GetAll(1)).Returns(new List<ArticleWithRequestedFieldsDTO>
    //        {
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 2, FieldIds = new [] {3}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 2, FieldIds = new [] {3}},
    //        });
    //        var taskMock = new Mock<ITaskConfigRepository>();


    //        var engine = new RecensysCoreBLL.TaskDistributionEngine(distMock.Object, dataMock.Object, taskMock.Object);
    //        var r = engine.Generate(1);

    //        taskMock.Verify(t => t.Create(It.IsAny<int>(), It.IsAny<int>(), It.IsAny<int>(), It.IsAny<int[]>()), Times.Exactly(2));
    //        taskMock.Verify(t => t.Create(It.IsAny<int>(), It.IsAny<int>(), It.IsAny<int>(), It.IsAny<int[]>()), Times.Exactly(1));
    //    }

    //    [Fact]
    //    public void Generate_moreUsersThanArticles__GivenToFirstUser()
    //    {
    //        var distMock = new Mock<IDistributionRepository>();
    //        distMock.Setup(d => d.Read(1)).Returns(new DistributionDTO()
    //        {
    //            Dist = new List<UserWorkDTO>
    //            {
    //                new UserWorkDTO {Id = 1, Range = new []{0.0, 50.0}}
    //            }
    //        });
    //        var dataMock = new Mock<IRequestedFieldsRepository>();
    //        dataMock.Setup(d => d.GetAll(1)).Returns(new List<ArticleWithRequestedFieldsDTO>
    //        {
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 2, FieldIds = new [] {3}},
    //        });
    //        var taskMock = new Mock<ITaskConfigRepository>();


    //        var engine = new RecensysCoreBLL.TaskDistributionEngine(distMock.Object, dataMock.Object, taskMock.Object);
    //        var r = engine.Generate(1);

    //        taskMock.Verify(t => t.Create(It.IsAny<int>(), It.IsAny<int>(), It.IsAny<int>(), It.IsAny<int[]>()), Times.Exactly(1));
    //        taskMock.Verify(t => t.Create(It.IsAny<int>(), It.IsAny<int>(), It.IsAny<int>(), It.IsAny<int[]>()), Times.Exactly(0));
    //    }


    //    [Fact]
    //    public void Generate_100articles2users__CorrectlyDivided()
    //    {
    //        var distMock = new Mock<IDistributionRepository>();
    //        distMock.Setup(d => d.Read(1)).Returns(new DistributionDTO()
    //        {
    //            Dist = new List<UserWorkDTO>
    //            {
    //                new UserWorkDTO {Id = 1, Range = new []{0.0, 50.0}},
    //                new UserWorkDTO {Id = 2, Range = new []{50.0, 100.0}}
    //            }
    //        });
    //        var dataMock = new Mock<IRequestedFieldsRepository>();
    //        dataMock.Setup(d => d.GetAll(1)).Returns(new List<ArticleWithRequestedFieldsDTO>
    //        {
    //            #region model
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //#endregion model 
    //        });
    //        var taskMock = new Mock<ITaskConfigRepository>();


    //        var engine = new RecensysCoreBLL.TaskDistributionEngine(distMock.Object, dataMock.Object, taskMock.Object);
    //        var r = engine.Generate(1);

    //        taskMock.Verify(t => t.Create(It.IsAny<int>(), It.IsAny<int>(), It.IsAny<int>(), It.IsAny<int[]>()), Times.Exactly(50));
    //        taskMock.Verify(t => t.Create(It.IsAny<int>(), It.IsAny<int>(), It.IsAny<int>(), It.IsAny<int[]>()), Times.Exactly(50));
    //    }

    //    [Fact]
    //    public void Generate_100articles3users__CorrectlyDivided()
    //    {
    //        var distMock = new Mock<IDistributionRepository>();
    //        distMock.Setup(d => d.Read(1)).Returns(new DistributionDTO()
    //        {
    //            Dist = new List<UserWorkDTO>
    //            {
    //                new UserWorkDTO {Id = 1, Range = new []{0.0, 33.0}},
    //                new UserWorkDTO {Id = 2, Range = new []{33.0, 66.0}},
    //                new UserWorkDTO {Id = 3, Range = new []{66.0, 100.0}}
    //            }
    //        });
    //        var dataMock = new Mock<IRequestedFieldsRepository>();
    //        dataMock.Setup(d => d.GetAll(1)).Returns(new List<ArticleWithRequestedFieldsDTO>
    //        {
    //            #region model
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //            new ArticleWithRequestedFieldsDTO {ArticleId = 1, FieldIds = new [] {1}},
    //#endregion model 
    //        });
    //        var taskMock = new Mock<ITaskConfigRepository>();


    //        var engine = new RecensysCoreBLL.TaskDistributionEngine(distMock.Object, dataMock.Object, taskMock.Object);
    //        var r = engine.Generate(1);

    //        taskMock.Verify(t => t.Create(It.IsAny<int>(), It.IsAny<int>(), It.IsAny<int>(), It.IsAny<int[]>()), Times.Exactly(33));
    //        taskMock.Verify(t => t.Create(It.IsAny<int>(), It.IsAny<int>(), It.IsAny<int>(), It.IsAny<int[]>()), Times.Exactly(33));
    //        taskMock.Verify(t => t.Create(It.IsAny<int>(), It.IsAny<int>(), It.IsAny<int>(), It.IsAny<int[]>()), Times.Exactly(34));
    //    }

    }
}
