using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RecensysCoreRepository.DTOs;
using RecensysCoreRepository.EFRepository;
using RecensysCoreRepository.EFRepository.Entities;
using RecensysCoreRepository.EFRepository.Repositories;
using Xunit;

namespace RecensysCoreRepository.Tests.Unittests
{
    public class FieldRepositoryTests
    {

        //[Fact]
        //public void Update_fieldNotInStorePassed_fieldCreatedWithAvailableType()
        //{
        //    var options = Helpers.CreateInMemoryOptions();
        //    var context = new RecensysContext(options);
        //    var repo = new FieldRepository(context);
        //    context.Studies.Add(new Study {Id = 1, Stages = new List<Stage> {new Stage { Id = 1 } } });
        //    context.SaveChanges();
        //    var dto = new[] {new FieldDTO
        //    {
        //        DataType = DataType.Boolean, Name = "Field"
        //    },};

        //    using (repo)
        //    {
        //        repo.Update(1, dto);

        //        Assert.Equal(1, context.Fields.Count());
        //        Assert.Equal(FieldType.Available, context.StageFieldRelations.First(f => f.StageId == 1).FieldType);
        //    }

        //}

    }
}
