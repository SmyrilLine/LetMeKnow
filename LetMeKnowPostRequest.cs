using System;
using System.Text.Json.Serialization;

public class LetMeKnowPostRequest
{
    [JsonPropertyName("type")]
    public string Type { get; set; }

    [JsonPropertyName("message")]
    public string Message { get; set; }
    
    [JsonPropertyName("source")]
    public string Source { get; set; }
    
    [JsonPropertyName("lineno")]
    public int Lineno { get; set; }
    
    [JsonPropertyName("colno")]
    public int Colno { get; set; }
    
    [JsonPropertyName("error")]
    public string Error { get; set; }
    
    [JsonPropertyName("timestamp")]
    public long Timestamp { get; set; }
    
    [JsonPropertyName("pageURL")]
    public string PageURL { get; set; }
    
    [JsonPropertyName("sessionID")]
    public string SessionID { get; set; }
    
    [JsonPropertyName("browser")]
    public BrowserInfo Browser { get; set; }

    public class BrowserInfo
    {
        [JsonPropertyName("sessionID")]
        public string SessionID { get; set; }
        
        [JsonPropertyName("OS")]
        public string OS { get; set; }
        
        [JsonPropertyName("Browser")]
        public string Browser { get; set; }
        
        [JsonPropertyName("Language")]
        public string Language { get; set; }
    }

}
