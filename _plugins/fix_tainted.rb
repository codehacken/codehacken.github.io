# This is a monkey patch to fix Liquid 4.0.3 on Ruby 3.2+
# Reference: https://github.com/jekyll/jekyll/issues/9249

if !Object.instance_methods.include?(:tainted?)
  class Object
    def tainted?
      false
    end
  end
end
