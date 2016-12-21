using System;

namespace RecensysCoreBLL.Exceptions
{
    internal class StrategyNotFoundException : Exception
    {
        public StrategyNotFoundException()
        {
        }

        public StrategyNotFoundException(string message) : base(message)
        {
        }

        public StrategyNotFoundException(string message, Exception innerException) : base(message, innerException)
        {
        }
        
    }
}
