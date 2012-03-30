cat > ../app/views/documents/_form.html.erb <<HERE

<p>
  <label for="document_name">Document</label><%= text_field 'document', 'name'  %>
  <label for="document_note">Note</label><%= text_field 'document', 'note'  %>
</p>

<p>
  <label for="document_location_id">Location</label>
  <%= select( "document", "location_id", Location.find(:all, :order => "name" ).collect { |l| [l.name, l.id] } ) %>
</p>

<p>
  <% for category in Category.find(:all, :order => "name" ) %>
    <%= check_box_tag "document[category_ids][]", category.id, @document.categories.include?(category) %><%= category.name %><br/>
  <% end %>
</p>
HERE
