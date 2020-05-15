
$('#reviewForm').submit((e) =>{

    if($('.alert.alert-danger'))
    $('.alert.alert-danger').hide();

    if( !$('#reviewText').val() || !$('#rating').val() || !$('#username').val() ){

        if($('.alert.alert-danger').length)
        $('.alert.alert-danger').show()
        
        else{
            $('#reviewForm').prepend(`<div class="alert alert-danger alert-dismissible" role="alert">
            <strong>Please enter the value in all the fields.</strong> 
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>`)
        }
        
        return false;

    }
    
});