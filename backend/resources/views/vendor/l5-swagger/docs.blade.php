<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>{{ $documentationTitle }}</title>
    <link rel="stylesheet" type="text/css" href="{{ route('l5-swagger.default.asset', 'swagger-ui.css') }}">
    <link rel="icon" type="image/png" href="{{ route('l5-swagger.default.asset', 'favicon-32x32.png') }}" sizes="32x32"/>
    <link rel="icon" type="image/png" href="{{ route('l5-swagger.default.asset', 'favicon-16x16.png') }}" sizes="16x16"/>
    <style>
        html { box-sizing: border-box; overflow: -moz-scrollbars-vertical; overflow-y: scroll; }
        *, *:before, *:after { box-sizing: inherit; }
        body { margin: 0; background: #fafafa; }
    </style>
</head>
<body>
<div id="swagger-ui"></div>

<script src="{{ route('l5-swagger.default.asset', 'swagger-ui-bundle.js') }}"></script>
<script src="{{ route('l5-swagger.default.asset', 'swagger-ui-standalone-preset.js') }}"></script>
<script>
    window.onload = function () {
        const ui = SwaggerUIBundle({
            dom_id: '#swagger-ui',
            url: "{{ $specUrl }}",
            operationsSorter: null,
            validatorUrl: null,
            oauth2RedirectUrl: "{{ route('l5-swagger.default.oauth2_callback') }}",
            requestInterceptor: function (request) {
                request.headers['X-CSRF-TOKEN'] = '{{ csrf_token() }}';
                return request;
            },
            presets: [
                SwaggerUIBundle.presets.apis,
                SwaggerUIStandalonePreset
            ],
            plugins: [
                SwaggerUIBundle.plugins.DownloadUrl
            ],
            layout: "StandaloneLayout",
            docExpansion: "none",
            deepLinking: true,
            filter: true,
            persistAuthorization: false
        });
        window.ui = ui;
    };
</script>
</body>
</html>