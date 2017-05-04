namespace RecensysCoreBLL.CriteriaEngine
{
    public interface IEvaluator
    {
        bool Eval(string expected, string op, string actual);

    }
}