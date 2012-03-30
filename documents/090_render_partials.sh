echo "<%= render(:partial => 'form' ) %>"
cd ../app/views/documents
cp edit.html.erb edit.html.erb.original
cp _form.html.erb _form.html.erb.original
cp index.html.erb index.html.erb.original
cp new.html.erb new.html.erb.original
cp show.html.erb show.html.erb.original
cd -
emacs ../app/views/documents

