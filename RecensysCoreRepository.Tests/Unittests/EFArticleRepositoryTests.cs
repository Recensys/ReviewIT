using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using RecensysCoreRepository.DTOs;
using RecensysCoreRepository.EFRepository;
using RecensysCoreRepository.EFRepository.Entities;
using RecensysCoreRepository.EFRepository.Repositories;
using Xunit;
using Task = System.Threading.Tasks.Task;

namespace RecensysCoreRepository.Tests.Unittests
{
    public class EFArticleRepositoryTests
    {






        // Since we had to move to a raw SQL query, it will not run on the in-memory
        // implementation of EF core

        //[Fact]
        //public void TestTest()
        //{
        //    var context = new RecensysContext();

        //    int studyId = 1;

        //    string query = $@"SELECT temp.Id, temp.CriteriaResultId2, temp.StudyId
        //                FROM 
	       //                 (SELECT dbo.Articles.Id, dbo.Articles.CriteriaResultId2, dbo.Articles.StudyId, dbo.Criterias.Type
	       //                 FROM dbo.Articles
	       //                 FULL OUTER JOIN dbo.CriteriaResults ON dbo.Articles.Id = dbo.CriteriaResults.ArticleId
	       //                 FULL OUTER JOIN dbo.Criterias ON dbo.Criterias.Id = dbo.CriteriaResults.CriteriaId
	       //                 WHERE dbo.Articles.StudyId = {studyId}) AS temp
        //                WHERE temp.Type IS NULL OR temp.Type != 1";

        //    var r = context.Articles.FromSql(query).Select(a => a.Id).ToList();
        //}

        //[Fact(DisplayName = "GetAllActiveIds() one included article = one articleId returned")]
        //public void GetAllActiveTest1()
        //{
        //    var options = Helpers.CreateInMemoryOptions();
        //    var context = new RecensysContext(options);
        //    var repo = new EFArticleRepository(context);
        //    #region model
        //    var study = new Study
        //    {
        //        Id = 1,
        //        Stages = new List<Stage>
        //        {
        //            new Stage
        //            {
        //                Id = 1,
        //                CriteriaResults = new List<CriteriaResult>
        //                {
        //                    new CriteriaResult
        //                    {
        //                        CriteriaId = 1,
        //                        Article = new Article {Id = 1, StudyId = 1},
        //                        Criteria = new Criteria {Id = 1, Type = CriteriaType.Inclusion}
        //                    }
        //                }
        //            }
        //        }
        //    };
        //    #endregion
        //    context.Studies.Add(study);
        //    context.SaveChanges();

        //    using (repo)
        //    {
        //        var r = repo.GetAllActiveIds(1).ToList();

        //        Assert.Equal(1, r.Count(id => id == 1));
        //    }
        //}

        //[Fact(DisplayName = "GetAllActiveIds() one excluded article = no articleIds returned")]
        //public void GetAllActiveTest2()
        //{
        //    var options = Helpers.CreateInMemoryOptions();
        //    var context = new RecensysContext(options);
        //    var repo = new EFArticleRepository(context);
        //    #region model
        //    var study = new Study
        //    {
        //        Id = 1,
        //        Stages = new List<Stage>
        //        {
        //            new Stage
        //            {
        //                Id = 1,
        //                CriteriaResults = new List<CriteriaResult>
        //                {
        //                    new CriteriaResult
        //                    {
        //                        CriteriaId = 1,
        //                        Article = new Article {Id = 1, StudyId = 1, CriteriaResultId2 = 1},
        //                        Criteria = new Criteria {Id = 1, Type = CriteriaType.Exclusion}
        //                    }
        //                },
        //            }
        //        }
        //    };
        //    #endregion
        //    context.Studies.Add(study);
        //    context.SaveChanges();

        //    using (repo)
        //    {
        //        var r = repo.GetAllActiveIds(1).ToList();

        //        Assert.Equal(0, r.Count(id => id == 1));
        //    }
        //}

        

        //[Fact(DisplayName = "GetAllActiveIds() one excluded and one included article = included articleId returned")]
        //public void GetAllActiveTest3()
        //{
        //    var options = Helpers.CreateInMemoryOptions();
        //    var context = new RecensysContext(options);
        //    var repo = new EFArticleRepository(context);
        //    #region model
        //    var study = new Study
        //    {
        //        Id = 1,
        //        Stages = new List<Stage>
        //        {
        //            new Stage
        //            {
        //                Id = 1,
        //                CriteriaResults = new List<CriteriaResult>
        //                {
        //                    new CriteriaResult
        //                    {
        //                        Article = new Article {Id = 1, StudyId = 1},
        //                        Criteria = new Criteria {Id = 1, Type = CriteriaType.Exclusion}
        //                    },
        //                    new CriteriaResult
        //                    {
        //                        Article = new Article {Id = 2, StudyId = 1},
        //                        Criteria = new Criteria {Id = 2, Type = CriteriaType.Inclusion}
        //                    }
        //                }
        //            }
        //        }
        //    };
        //    #endregion
        //    context.Studies.Add(study);
        //    context.SaveChanges();

        //    using (repo)
        //    {
        //        var r = repo.GetAllActiveIds(1).ToList();

        //        Assert.Equal(1, r.Count(id => id == 2));
        //    }
        //}

        //[Fact(DisplayName = "GetAllActiveIds() 3 stages with 1 article excluded in first stage = no articleIds returned")]
        //public void GetAllActiveTest4()
        //{
        //    var options = Helpers.CreateInMemoryOptions();
        //    var context = new RecensysContext(options);
        //    var repo = new EFArticleRepository(context);
        //    #region model
        //    var study = new Study
        //    {
        //        Id = 1,
        //        Stages = new List<Stage>
        //        {
        //            new Stage
        //            {
        //                Id = 1,
        //                CriteriaResults = new List<CriteriaResult>
        //                {
        //                    new CriteriaResult
        //                    {
        //                        Id = 1,
        //                        Article = new Article {Id = 1, StudyId = 1, CriteriaResultId2 = 1},
        //                        Criteria = new Criteria {Id = 1, Type = CriteriaType.Exclusion},
        //                        StageId = 1,
        //                    }
        //                }
        //            },
        //            new Stage
        //            {
        //                Id = 2
        //            }, new Stage
        //            {
        //                Id = 3
        //            }
        //        }
        //    };
        //    #endregion
        //    context.Studies.Add(study);
        //    context.SaveChanges();

        //    using (repo)
        //    {
        //        var r = repo.GetAllActiveIds(3).ToList();

        //        Assert.Equal(0, r.Count(id => id == 1));
        //    }
        //}


        //[Fact(DisplayName = "GetAllActiveIds() 3 stages with 1 article included in first stage = one articleId returned")]
        //public void GetAllActiveTest5()
        //{
        //    var options = Helpers.CreateInMemoryOptions();
        //    var context = new RecensysContext(options);
        //    var repo = new EFArticleRepository(context);
        //    #region model
        //    var study = new Study
        //    {
        //        Id = 1,
        //        Stages = new List<Stage>
        //        {
        //            new Stage
        //            {
        //                Id = 1,
        //                CriteriaResults = new List<CriteriaResult>
        //                {
        //                    new CriteriaResult
        //                    {
        //                        Article = new Article {Id = 1, StudyId = 1},
        //                        Criteria = new Criteria {Id = 1, Type = CriteriaType.Inclusion},
        //                        StageId = 1
        //                    }
        //                }
        //            },
        //            new Stage
        //            {
        //                Id = 2
        //            }, new Stage
        //            {
        //                Id = 3
        //            }
        //        }
        //    };
        //    #endregion
        //    context.Studies.Add(study);
        //    context.SaveChanges();

        //    using (repo)
        //    {
        //        var r = repo.GetAllActiveIds(3).ToList();

        //        Assert.Equal(1, r.Count(id => id == 1));
        //    }
        //}

        //[Fact(DisplayName = "GetAllActiveIds() one article with no criteria = one articleId returned")]
        //public async Task GetAllActiveTest6()
        //{
        //    var options = Helpers.CreateInMemoryOptions();
        //    var context = new RecensysContext(options);
        //    var repo = new EFArticleRepository(context);
        //    #region model
        //    var study = new Study
        //    {
        //        Id = 1,
        //        Stages = new List<Stage>
        //        {
        //            new Stage
        //            {
        //                Id = 1
        //            }
        //        },
        //        Articles = new List<Article>
        //        {
        //            new Article
        //            {
        //                Id = 1, StudyId = 1, CriteriaResultId2 = null, CriteriaResult = null
        //            }
        //        }
        //    };
        //    #endregion
        //    context.Studies.Add(study);
        //    await context.SaveChangesAsync();

        //    var aa = (from a in context.Articles select a).ToList();
        //    var dd = (from a in context.Articles
        //        where a.StudyId == 1 && (!a.CriteriaResultId2.HasValue || a.CriteriaResult.Criteria.Type != CriteriaType.Exclusion)
        //        select a).ToList();


        //    using (repo)
        //    {
        //        var r = repo.GetAllActiveIds(1).ToList();

        //        Assert.Equal(1, r.Count(id => id == 1));
        //    }
        //}


        //[Fact(DisplayName = "GetAllActiveIds() one article with no criteria and one with inclusion = two articleIds returned")]
        //public void GetAllActiveTest7()
        //{
        //    var options = Helpers.CreateInMemoryOptions();
        //    var context = new RecensysContext(options);
        //    var repo = new EFArticleRepository(context);
        //    #region model
        //    var study = new Study
        //    {
        //        Id = 1,
        //        Stages = new List<Stage>
        //        {
        //            new Stage
        //            {
        //                Id = 1
        //            }
        //        },
        //        Articles = new List<Article>
        //        {
        //            new Article
        //            {
        //                Id = 1, StudyId = 1,
        //            },
        //            new Article
        //            {
        //                Id = 2,
        //                StudyId = 1,
        //                CriteriaResult = new CriteriaResult
        //                {
        //                    StageId = 1,
        //                    CriteriaId = 1,
        //                    Criteria = new Criteria
        //                    {
        //                        StudyId = 1,
        //                        Type = CriteriaType.Inclusion,
        //                    }
        //                },
        //                CriteriaResultId2 = 1
        //            }
        //        }
        //    };
        //    #endregion
        //    context.Studies.Add(study);
        //    context.SaveChanges();

            
        //    using (repo)
        //    {
        //        var r = repo.GetAllActiveIds(1).ToList();

        //        Assert.Equal(1, r.Count(id => id == 1));
        //        Assert.Equal(1, r.Count(id => id == 2));
        //    }
        //}


        //[Fact(DisplayName = "GetAllActiveIds() one article with no criteria and one with exclusion = one articleId returned")]
        //public void GetAllActiveTest8()
        //{
        //    var options = Helpers.CreateInMemoryOptions();
        //    var context = new RecensysContext(options);
        //    var repo = new EFArticleRepository(context);
        //    #region model
        //    var study = new Study
        //    {
        //        Id = 1,
        //        Stages = new List<Stage>
        //        {
        //            new Stage
        //            {
        //                Id = 1
        //            }
        //        },
        //        Articles = new List<Article>
        //        {
        //            new Article
        //            {
        //                Id = 1, StudyId = 1,
        //            },
        //            new Article
        //            {
        //                Id = 2,
        //                StudyId = 1,
        //                CriteriaResult = new CriteriaResult
        //                {
        //                    StageId = 1,
        //                    CriteriaId = 1,
        //                    Criteria = new Criteria
        //                    {
        //                        StudyId = 1,
        //                        Type = CriteriaType.Exclusion,
        //                    }
        //                },
        //                CriteriaResultId2 = 1
        //            }
        //        }
        //    };
        //    #endregion
        //    context.Studies.Add(study);
        //    context.SaveChanges();


        //    using (repo)
        //    {
        //        var r = repo.GetAllActiveIds(1).ToList();

        //        Assert.Equal(1, r.Count(id => id == 1));
        //        Assert.Equal(0, r.Count(id => id == 2));
        //    }
        //}


        //[Fact(DisplayName = "GetAllActiveIds() one article in other study = no active")]
        //public void GetAllActiveTest9()
        //{
        //    var options = Helpers.CreateInMemoryOptions();
        //    var context = new RecensysContext(options);
        //    var repo = new EFArticleRepository(context);
        //    #region model
        //    var study = new Study
        //    {
        //        Id = 1,
        //        Stages = new List<Stage>
        //        {
        //            new Stage
        //            {
        //                Id = 1
        //            }
        //        },
        //        Articles = new List<Article>
        //        {
        //            new Article
        //            {
        //                Id = 1, StudyId = 1,
        //            },
        //            new Article
        //            {
        //                Id = 2,
        //                StudyId = 1,
        //                CriteriaResult = new CriteriaResult
        //                {
        //                    StageId = 1,
        //                    CriteriaId = 1,
        //                    Criteria = new Criteria
        //                    {
        //                        StudyId = 1,
        //                        Type = CriteriaType.Exclusion,
        //                    }
        //                },
        //                CriteriaResultId2 = 1
        //            }
        //        }
        //    };
        //    var study2 = new Study
        //    {
        //        Id = 2,
        //        Stages = new List<Stage>
        //        {
        //            new Stage { Id = 3, StudyId = 2}
        //        }
        //    };
        //    #endregion
        //    context.Studies.AddRange(study, study2);
        //    context.SaveChanges();


        //    using (repo)
        //    {
        //        var r = repo.GetAllActiveIds(3).ToList();

        //        Assert.Equal(0, r.Count);
        //    }
        //}

        //[Fact]
        //public void GetAllWithRequestedData_stageWith1RequestedField__1RequestedField()
        //{
        //    var options = Helpers.CreateInMemoryOptions();
        //    var context = new RecensysContext(options);
        //    var repo = new EFArticleRepository(context);
        //    #region model
        //    var study = new Study
        //    {
        //        Id = 1,
        //        Stages = new List<Stage>
        //        {
        //            new Stage
        //            {
        //                Id = 1,
        //                StageFields = new List<StageFieldRelation>
        //                {
        //                    new StageFieldRelation
        //                    {
        //                        FieldType = FieldType.Requested,
        //                        Field = new Field
        //                        {
        //                            Data = new List<Data>
        //                            {
        //                                new Data
        //                                {
        //                                    Id = 1,
        //                                    Article = new Article
        //                                    {
        //                                        Id = 1,
        //                                        StudyId = 1
        //                                    }
        //                                }
        //                            }
        //                        }
        //                    }
        //                }
        //            }
        //        }
        //    };
        //    #endregion
        //    context.Studies.Add(study);
        //    context.SaveChanges();

        //    using (repo)
        //    {
        //        var r = repo.GetAllWithRequestedFields(1);
        //        Assert.Equal(1, r.First().FieldIds.Count());
        //    }
        //}

        //[Fact]
        //public void GetAllWithRequestedData_stageWith1VisibleField__0RequestedField()
        //{
        //    var options = Helpers.CreateInMemoryOptions();
        //    var context = new RecensysContext(options);
        //    var repo = new EFArticleRepository(context);
        //    #region model
        //    var study = new Study
        //    {
        //        Id = 1,
        //        Stages = new List<Stage>
        //        {
        //            new Stage
        //            {
        //                Id = 1,
        //                StageFields = new List<StageFieldRelation>
        //                {
        //                    new StageFieldRelation
        //                    {
        //                        FieldType = FieldType.Visible,
        //                        Field = new Field
        //                        {
        //                            Data = new List<Data>
        //                            {
        //                                new Data
        //                                {
        //                                    Id = 1,
        //                                    Article = new Article
        //                                    {
        //                                        Id = 1,
        //                                        StudyId = 1
        //                                    }
        //                                }
        //                            }
        //                        }
        //                    }
        //                }
        //            }
        //        }
        //    };
        //    #endregion
        //    context.Studies.Add(study);
        //    context.SaveChanges();

        //    using (repo)
        //    {
        //        var r = repo.GetAllWithRequestedFields(1).ToList();
        //        Assert.Equal(0, r.First().FieldIds.Count());
        //    }
        //}

        
    }
}
