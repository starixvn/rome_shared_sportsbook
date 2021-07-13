namespace Fanex.PTEngine
{
    using System.Collections;

    public static class HashtableExtension
    {
        public static void SafeRemove(this Hashtable hashtable, object key)
        {
            if (hashtable.ContainsKey(key))
            {
                hashtable.Remove(key);
            }
        }
    }
}