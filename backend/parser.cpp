#include <napi.h>
#include <fstream>
#include <string>
#include <sstream>

Napi::String ReadFile(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    if (info.Length() < 1 || !info[0].IsString()) {
        Napi::TypeError::New(env, "String expected for file path").ThrowAsJavaScriptException();
        return Napi::String::New(env, "");
    }
    
    std::string filePath = info[0].As<Napi::String>().Utf8Value();
    std::ifstream file(filePath);
    std::stringstream buffer;

    if (file) {
        buffer << file.rdbuf();
        file.close();
    } else {
        // Return an empty string instead of throwing an error to allow JS fallback
        return Napi::String::New(env, "");
    }
    
    return Napi::String::New(env, buffer.str());
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
    exports.Set(Napi::String::New(env, "readFile"), Napi::Function::New(env, ReadFile));
    return exports;
}

NODE_API_MODULE(parser, Init)