import "@lovable.dev/ai-gateway";

declare namespace ModelContract_d1194e06591b7d3d {
export type paths = Record<string, never>;
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        
        AudioResponse: Blob;
        Input_AllowedToolsParam: {
            mode?: ("auto" | "any" | "none" | "validated") | string;
            tools?: string[];
        };
        Input_AnnotationParam: components["schemas"]["Input_SpeechAnnotationParam"] | components["schemas"]["Input_URLCitationParam"] | components["schemas"]["Input_PlaceCitationParam"] | components["schemas"]["Input_WordInfoParam"] | components["schemas"]["Input_FileCitationParam"];
        Input_AudioContentParam: {
            channels?: number;
            data: string;
            mime_type?: ("audio/wav" | "audio/mp3" | "audio/aiff" | "audio/aac" | "audio/ogg" | "audio/flac" | "audio/mpeg" | "audio/m4a" | "audio/l16" | "audio/opus" | "audio/alaw" | "audio/mulaw" | "audio/webm") | string;
            sample_rate?: number;
            
            type: "audio";
        };
        Input_AudioResponseFormatParam: {
            bit_rate?: number;
            delivery?: ("inline" | "uri") | string;
            mime_type?: ("audio/mp3" | "audio/ogg_opus" | "audio/l16" | "audio/wav" | "audio/alaw" | "audio/mulaw") | string;
            sample_rate?: number;
            
            type: "audio";
        };
        Input_ContentParam: components["schemas"]["Input_TextContentParam"] | components["schemas"]["Input_DocumentContentParam"] | components["schemas"]["Input_ImageContentParam"] | components["schemas"]["Input_AudioContentParam"] | components["schemas"]["Input_VideoContentParam"];
        Input_CreateModelInteractionResponseFormatParam: components["schemas"]["Input_ResponseFormatParam"] | components["schemas"]["Input_ResponseFormatParam"][];
        Input_DocumentContentParam: {
            data: string;
            mime_type?: ("application/pdf" | "text/csv") | string;
            
            type: "document";
        };
        Input_FileCitationParam: {
            custom_metadata?: {
                [key: string]: unknown;
            };
            document_uri?: string;
            end_index?: number;
            file_name?: string;
            media_id?: string;
            page_number?: number;
            source?: string;
            start_index?: number;
            
            type: "file_citation";
        };
        Input_GenerationConfigParam: {
            image_config?: components["schemas"]["Input_ImageConfigParam"];
            max_output_tokens?: number;
            seed?: number;
            speech_config?: components["schemas"]["Input_SpeechConfigUnionParam"];
            stop_sequences?: string[];
            temperature?: number;
            thinking_level?: ("minimal" | "low" | "medium" | "high") | string;
            thinking_summaries?: ("auto" | "none") | string;
            tool_choice?: components["schemas"]["Input_ToolChoiceParam"];
            top_p?: number;
            transcription_config?: components["schemas"]["Input_TranscriptionConfigParam"];
            video_config?: components["schemas"]["Input_VideoConfigParam"];
        };
        Input_ImageConfigParam: {
            aspect_ratio?: ("1:1" | "2:3" | "3:2" | "3:4" | "4:3" | "4:5" | "5:4" | "9:16" | "16:9" | "21:9" | "1:8" | "8:1" | "1:4" | "4:1") | string;
            image_size?: ("1K" | "2K" | "4K" | "512") | string;
        };
        Input_ImageContentParam: {
            data: string;
            mime_type?: ("image/png" | "image/jpeg" | "image/webp" | "image/heic" | "image/heif" | "image/gif" | "image/bmp" | "image/tiff") | string;
            resolution?: ("low" | "medium" | "high" | "ultra_high") | string;
            
            type: "image";
        };
        Input_ImageResponseFormatParam: {
            aspect_ratio?: ("1:1" | "2:3" | "3:2" | "3:4" | "4:3" | "4:5" | "5:4" | "9:16" | "16:9" | "21:9" | "1:8" | "8:1" | "1:4" | "4:1") | string;
            delivery?: ("inline" | "uri") | string;
            image_size?: ("1K" | "2K" | "4K" | "512") | string;
            
            mime_type?: "image/jpeg";
            
            type: "image";
        };
        Input_PlaceCitationParam: {
            end_index?: number;
            name?: string;
            place_id?: string;
            review_snippets?: components["schemas"]["Input_ReviewSnippetParam"][];
            start_index?: number;
            
            type: "place_citation";
            url?: string;
        };
        Input_ProcessingParam: components["schemas"]["Input_StaticMediaProcessingParam"] | ("static" | "agentic") | string;
        Input_ResponseFormatParam: components["schemas"]["Input_TextResponseFormatParam"] | components["schemas"]["Input_AudioResponseFormatParam"] | components["schemas"]["Input_ImageResponseFormatParam"] | components["schemas"]["Input_VideoResponseFormatParam"] | {
            [key: string]: unknown;
        };
        Input_ReviewSnippetParam: {
            review_id?: string;
            title?: string;
            url?: string;
        };
        Input_SafetySettingParam: {
            method?: ("severity" | "probability") | string;
            threshold: ("block_low_and_above" | "block_medium_and_above" | "block_only_high" | "block_none" | "off") | string;
            type: ("hate_speech" | "dangerous_content" | "harassment" | "sexually_explicit" | "civic_integrity" | "image_hate" | "image_dangerous_content" | "image_harassment" | "image_sexually_explicit" | "jailbreak") | string;
        };
        Input_SmartTranscriptionModeParam: {
            
            type: "smart";
        };
        Input_SpeakerConfigParam: {
            speakers?: components["schemas"]["Input_SpeechConfigParam"][];
        };
        Input_SpeechAnnotationParam: {
            end_index?: number;
            speaker?: string;
            start_index?: number;
            style?: string;
            
            type: "speech_metadata";
        };
        Input_SpeechConfigParam: {
            language?: string;
            speaker?: string;
            voice?: string;
        };
        Input_SpeechConfigUnionParam: components["schemas"]["Input_SpeakerConfigParam"] | components["schemas"]["Input_SpeechConfigParam"][];
        Input_StaticMediaProcessingParam: {
            end_offset?: string;
            fps?: number;
            start_offset?: string;
            
            type: "static";
        };
        Input_TextContentParam: {
            annotations?: components["schemas"]["Input_AnnotationParam"][];
            text: string;
            
            type: "text";
        };
        Input_TextResponseFormatParam: {
            mime_type?: ("application/json" | "text/plain") | string;
            schema_?: {
                [key: string]: unknown;
            };
            
            type: "text";
        };
        Input_ToolChoiceConfigParam: {
            allowed_tools?: components["schemas"]["Input_AllowedToolsParam"];
        };
        Input_ToolChoiceParam: components["schemas"]["Input_ToolChoiceConfigParam"] | ("auto" | "any" | "none" | "validated") | string;
        Input_TranscriptionConfigModeParam: components["schemas"]["Input_TranscriptionModeParam"] | ("verbatim" | "smart") | string;
        Input_TranscriptionConfigParam: {
            adaptation_phrases?: string[];
            custom_vocabulary?: string[];
            diarization_mode?: string;
            language_codes?: string[];
            language_hints?: string[];
            mode?: components["schemas"]["Input_TranscriptionConfigModeParam"];
            timestamp_granularities?: string[];
        };
        Input_TranscriptionModeParam: components["schemas"]["Input_SmartTranscriptionModeParam"] | components["schemas"]["Input_VerbatimTranscriptionModeParam"];
        Input_URLCitationParam: {
            end_index?: number;
            start_index?: number;
            title?: string;
            
            type: "url_citation";
            url?: string;
        };
        Input_UserInputStepParam: {
            content?: components["schemas"]["Input_ContentParam"][];
            
            type: "user_input";
        };
        Input_VerbatimTranscriptionModeParam: {
            diarization_mode?: string;
            timestamp_granularities?: string[];
            
            type: "verbatim";
        };
        Input_VideoConfigParam: {
            task?: ("text_to_video" | "image_to_video" | "reference_to_video" | "edit" | "extend") | string;
        };
        Input_VideoContentParam: {
            data: string;
            mime_type?: ("video/mp4" | "video/mpeg" | "video/mpg" | "video/mov" | "video/avi" | "video/x-flv" | "video/webm" | "video/wmv" | "video/3gpp") | string;
            name?: string;
            processing?: components["schemas"]["Input_ProcessingParam"];
            resolution?: ("low" | "medium" | "high" | "ultra_high") | string;
            
            type: "video";
        };
        Input_VideoResponseFormatParam: {
            aspect_ratio?: ("16:9" | "9:16") | string;
            delivery?: ("inline" | "uri") | string;
            duration?: string;
            gcs_uri?: string;
            resolution?: ("360p" | "720p" | "1080p" | "4k") | string;
            
            type: "video";
        };
        Input_WordInfoParam: {
            end_index?: number;
            end_offset?: string;
            speaker?: string;
            start_index?: number;
            start_offset?: string;
            text?: string;
            
            type: "word_info";
        };
        InteractionRequest: {
            generation_config?: components["schemas"]["Input_GenerationConfigParam"];
            input: string | components["schemas"]["Input_ContentParam"] | components["schemas"]["Input_ContentParam"][] | components["schemas"]["Input_UserInputStepParam"][];
            
            model: "google/lyria-3-pro-preview";
            response_format?: components["schemas"]["Input_CreateModelInteractionResponseFormatParam"];
            response_mime_type?: string;
            response_modalities?: (("text" | "image" | "audio" | "video" | "document") | string)[];
            safety_settings?: components["schemas"]["Input_SafetySettingParam"][];
            stream_format?: "audio" | null;
            system_instruction?: string;
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export type operations = Record<string, never>;

}
/* The MIT License

Copyright (c) OpenAI (https://openai.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
 */
declare namespace ModelContract_2cd0b36f7d297877 {
export type paths = Record<string, never>;
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        GatewayErrorResponse: {
            error: {
                code?: string | null;
                message: string;
                metadata?: {
                    provider_name?: unknown;
                    raw?: unknown;
                };
                param?: unknown;
                type?: string;
            };
            usage?: {
                [key: string]: unknown;
            };
        };
        Output_CreateTranscriptionResponseJson: {
            languages?: components["schemas"]["Output_TranscriptionLanguage"][];
            logprobs?: {
                bytes?: number[];
                logprob?: number;
                token?: string;
            }[];
            text: string;
            usage?: components["schemas"]["Output_TranscriptTextUsageTokens"] | components["schemas"]["Output_TranscriptTextUsageDuration"];
        };
        Output_CreateTranscriptionResponseStreamEvent: components["schemas"]["Output_TranscriptTextSegmentEvent"] | components["schemas"]["Output_TranscriptTextDeltaEvent"] | components["schemas"]["Output_TranscriptTextDoneEvent"];
        Output_TranscriptionLanguage: {
            code: string;
        };
        Output_TranscriptTextDeltaEvent: {
            delta: string;
            logprobs?: {
                bytes?: number[];
                logprob?: number;
                token?: string;
            }[];
            segment_id?: string;
            
            type: "transcript.text.delta";
        };
        Output_TranscriptTextDoneEvent: {
            languages?: components["schemas"]["Output_TranscriptionLanguage"][];
            logprobs?: {
                bytes?: number[];
                logprob?: number;
                token?: string;
            }[];
            text: string;
            
            type: "transcript.text.done";
            usage?: components["schemas"]["Output_TranscriptTextUsageTokens"];
        };
        Output_TranscriptTextSegmentEvent: {
            
            end: number;
            id: string;
            speaker: string;
            
            start: number;
            text: string;
            
            type: "transcript.text.segment";
        };
        Output_TranscriptTextUsageDuration: {
            
            seconds: number;
            
            type: "duration";
        };
        Output_TranscriptTextUsageTokens: {
            input_token_details?: {
                audio_tokens?: number;
                text_tokens?: number;
            };
            input_tokens: number;
            output_tokens: number;
            total_tokens: number;
            
            type: "tokens";
        };
        TranscriptionEvent: components["schemas"]["Output_CreateTranscriptionResponseStreamEvent"] | components["schemas"]["GatewayErrorResponse"];
        
        TranscriptionInclude: "logprobs";
        TranscriptionRequest: {
            chunking_strategy?: ("auto" | components["schemas"]["VadConfig"]) | null;
            
            file: Blob;
            include?: components["schemas"]["TranscriptionInclude"][];
            keywords?: string[];
            known_speaker_names?: string[];
            known_speaker_references?: string[];
            language?: string;
            languages?: string[];
            
            model: "openai/gpt-transcribe";
            prompt?: string;
            
            response_format?: "json" | "text";
            stream?: boolean | null;
            
            temperature?: number;
            
            timestamp_granularities?: ("word" | "segment")[];
        };
        TranscriptionResponse: components["schemas"]["Output_CreateTranscriptionResponseJson"] | string;
        VadConfig: {
            
            prefix_padding_ms?: number;
            
            silence_duration_ms?: number;
            
            threshold?: number;
            
            type: "server_vad";
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export type operations = Record<string, never>;

}
declare module "@lovable.dev/ai-gateway" {
  interface GeneratedModelsBySurface {
    "chat-completions": "google/gemini-2.5-flash" | "google/gemini-2.5-flash-image" | "google/gemini-2.5-flash-lite" | "google/gemini-2.5-pro" | "google/gemini-3-flash-preview" | "google/gemini-3-pro-image" | "google/gemini-3.1-flash-image" | "google/gemini-3.1-flash-lite" | "google/gemini-3.1-pro-preview" | "google/gemini-3.5-flash" | "google/gemini-3.6-flash" | "google/gemini-3.7-flash" | "google/gemini-3.8-flash" | "openai/chat-latest" | "openai/gpt-5" | "openai/gpt-5-mini" | "openai/gpt-5-nano" | "openai/gpt-5.2" | "openai/gpt-5.4" | "openai/gpt-5.4-mini" | "openai/gpt-5.4-nano" | "openai/gpt-5.5" | "openai/gpt-5.6-luna" | "openai/gpt-5.6-sol" | "openai/gpt-5.6-terra" | "openai/gpt-6-astra";
    "responses": "openai/chat-latest" | "openai/gpt-5" | "openai/gpt-5-mini" | "openai/gpt-5-nano" | "openai/gpt-5.2" | "openai/gpt-5.4" | "openai/gpt-5.4-mini" | "openai/gpt-5.4-nano" | "openai/gpt-5.4-pro" | "openai/gpt-5.5" | "openai/gpt-5.5-pro" | "openai/gpt-5.6-luna" | "openai/gpt-5.6-sol" | "openai/gpt-5.6-terra" | "openai/gpt-6-astra";
    "messages": never;
    "interactions": never;
    "image-generation": "google/gemini-2.5-flash-image" | "google/gemini-3-pro-image" | "google/gemini-3.1-flash-image" | "google/gemini-3.1-flash-lite-image" | "openai/gpt-image-1-mini" | "openai/gpt-image-2";
    "image-edit": "openai/gpt-image-1-mini" | "openai/gpt-image-2";
    "embeddings": "google/gemini-embedding-001" | "google/gemini-embedding-2" | "openai/text-embedding-3-large" | "openai/text-embedding-3-small";
    "speech": "google/gemini-2.5-flash-lite-preview-tts" | "google/gemini-2.5-flash-tts" | "google/gemini-2.5-pro-tts" | "google/gemini-3.1-flash-tts-preview" | "openai/gpt-4o-mini-tts";
    "transcription": "google/gemini-3.5-transcribe" | "openai/gpt-4o-mini-transcribe" | "openai/gpt-4o-transcribe" | "openai/gpt-transcribe";
    "music": "google/lyria-3-pro-preview";
    "videos": "google/gemini-omni-1.1-flash" | "google/veo-3.1" | "google/veo-3.1-fast" | "google/veo-3.1-lite";
    "systemone": never;
    "live": never;
  }
  interface MusicFieldsByModel {
    "google/lyria-3-pro-preview": ModelContract_d1194e06591b7d3d.components["schemas"]["InteractionRequest"];
  }
  interface MusicResponseByModel {
    "google/lyria-3-pro-preview": ModelContract_d1194e06591b7d3d.components["schemas"]["AudioResponse"];
  }
  interface TranscriptionFieldsByModel {
    "openai/gpt-transcribe": ModelContract_2cd0b36f7d297877.components["schemas"]["TranscriptionRequest"];
  }
  interface TranscriptionResponseByModel {
    "openai/gpt-transcribe": ModelContract_2cd0b36f7d297877.components["schemas"]["TranscriptionResponse"];
  }
  interface TranscriptionEventByModel {
    "openai/gpt-transcribe": ModelContract_2cd0b36f7d297877.components["schemas"]["TranscriptionEvent"];
  }
}
